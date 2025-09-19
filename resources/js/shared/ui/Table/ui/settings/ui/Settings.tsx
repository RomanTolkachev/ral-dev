import { FunctionComponent, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomCellContext } from '@/shared/ui/Table/providers/CustomFormProvider';
import { createUniqueWithId, getAvailableColumns, getDefaultColumns, getUserColumns, setColumns } from '../lib';
import { useNavigate } from 'react-router-dom';
import { closestCorners, DndContext, DragEndEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import { SortableItem } from './SortableItem';
import { AxiosError } from 'axios';
import highlight from '../../../lib/highlightText';

interface Props {
    className?: string;
}

export const Settings: FunctionComponent<Props> = ({ className }) => {
    const navigate = useNavigate();
    const cellContext = useContext(CustomCellContext);
    const queryClient = useQueryClient();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5
            },
        })
    );

    if (!cellContext || !cellContext.config) {
        return null;
    }

    const { config: { HIDDEN_COLUMNS, TABLE_NAME, DICTIONARY } } = cellContext;

    const {
        data: availableColumns = [],
        isFetching: isAvailableColumnsFetching
    } = useQuery<string[], AxiosError>({
        queryKey: ['available', TABLE_NAME],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getAvailableColumns(TABLE_NAME),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const {
        data: defaultColumns = [],
        isFetching: isdefaultColumnsFetching
    } = useQuery<string[], AxiosError>({
        queryKey: ['default_columns', TABLE_NAME],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getDefaultColumns(TABLE_NAME),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const {
        data: selectedColumns = [],
        isFetching: isSelectedColumnsFetching
    } = useQuery<string[], AxiosError>({
        queryKey: ['selected', TABLE_NAME],
        retry: (failureCount, error) => ([401, 404].includes(error.status!) ? false : true),
        queryFn: () => getUserColumns(TABLE_NAME),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const [fullList, setFullList] = useState<{ value: string, id: UniqueIdentifier }[]>(availableColumns.length ? createUniqueWithId({ arrays: [availableColumns], exclude: HIDDEN_COLUMNS }) : []);
    const [columnsValues, setColumnsValues] = useState<string[]>(selectedColumns.length ? selectedColumns : []);
    const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

    const availableColumnsString = useMemo(() => JSON.stringify(availableColumns), [availableColumns]);
    const selectedColumnsString = useMemo(() => JSON.stringify(selectedColumns), [selectedColumns]);
    const defaultColumnsString = useMemo(() => JSON.stringify(defaultColumns), [defaultColumns]);

    // Функция для сортировки колонок в порядке defaultColumns + остальные в конце
    const sortColumnsByDefault = useCallback((columns: string[]) => {
        const defaultSet = new Set(defaultColumns);
        const defaultOrdered = columns.filter(col => defaultSet.has(col));
        const others = columns.filter(col => !defaultSet.has(col));

        // Сортируем default колонки в порядке из defaultColumns
        const sortedDefaults = defaultColumns.filter(col => defaultOrdered.includes(col));

        return [...sortedDefaults, ...others];
    }, [defaultColumnsString]);

    // Фильтрация списка по поисковому запросу
    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) {
            return fullList;
        }

        const query = searchQuery.toLowerCase().trim();
        return fullList.filter(item => {
            const displayName = DICTIONARY[item.value] ?? item.value;
            return displayName.toLowerCase().includes(query);
        });
    }, [fullList, searchQuery, DICTIONARY]);

    useEffect(() => {
        if (availableColumns.length > 0 && Array.isArray(selectedColumns)) {
            setFullList(createUniqueWithId({ arrays: [selectedColumns, availableColumns], exclude: HIDDEN_COLUMNS }));
        }
    }, [availableColumnsString, selectedColumnsString, HIDDEN_COLUMNS, createUniqueWithId]);

    useEffect(() => {
        if (selectedColumns.length > 0) {
            setColumnsValues(selectedColumns);
        }
    }, [selectedColumnsString]);

    const onUpdate = useMutation({
        mutationFn: (params: { settings: string[] }) => setColumns(params, TABLE_NAME),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === TABLE_NAME,
            });
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "selected",
            });
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "available",
            });
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "filters",
            });
            setTimeout(() => navigate(-1), 1000);
        }
    });

    const getPos = (id: UniqueIdentifier) => fullList.findIndex(item => item.id === id);

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (!over || active.id === over.id) return;

        setFullList(prev => {
            const originalPos = getPos(active.id);
            const newPos = getPos(over.id);

            if (originalPos === -1 || newPos === -1) {
                console.warn('Element not found in list');
                return prev;
            }

            return arrayMove(prev, originalPos, newPos);
        });
    };

    const handleToggle = (value: string) => {
        setColumnsValues(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    // Обработчик для "заполнить по умолчанию"
    const handleSetDefault = () => {
        setColumnsValues(defaultColumns);
        setFullList(prev => {
            const sortedValues = sortColumnsByDefault(prev.map(item => item.value));
            const itemMap = new Map(prev.map(item => [item.value, item]));
            return sortedValues
                .filter(value => itemMap.has(value))
                .map(value => itemMap.get(value)!);
        });
        setSearchQuery('');
    };

    // Обработчик для "выделить все" - БЕЗ изменения порядка
    const handleSelectAll = () => {
        setColumnsValues(availableColumns);
        setSearchQuery('');
        // Порядок fullList не меняем!
    };

    // Обработчик для "очистить все"
    const handleClearAll = () => {
        setColumnsValues([]);
        setSearchQuery('');
    };

    if (isAvailableColumnsFetching || isSelectedColumnsFetching) {
        return <div>загрузка</div>;
    }

    if (availableColumns.length === 0) {
        return <div>нет доступных колонок</div>;
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='shrink-0 text-header-text flex justify-around items-center pb-10'>
                <button
                    onClick={() => onUpdate.mutate({
                        settings: [...fullList.filter(item => columnsValues.includes(item.value)).map(item => item.value), ...HIDDEN_COLUMNS]
                    })}
                    disabled={onUpdate.isPending}
                >
                    {onUpdate.isPending ? 'Отправка...' : 'Отправить'}
                </button>
                <button onClick={handleSelectAll}>выделить все</button>
                <button onClick={handleClearAll}>очистить все</button>
                <button onClick={handleSetDefault}>заполнить по-умолчанию</button>

                {/* Инпут для поиска */}
                <input
                    type='text'
                    placeholder='Поиск...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border p-1'
                />
            </div>
            <div className={`${className} flex-1 columns-2 overflow-y-auto overflow-x-hidden`}>
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors} modifiers={[/* restrictToVerticalAxis */]}>
                    <SortableContext items={fullList} strategy={rectSortingStrategy}>
                        {filteredList.map((item) => {
                            const displayName = DICTIONARY[item.value] ?? item.value;
                            const highlightedContent = highlight(displayName, searchQuery);

                            return (
                                <SortableItem
                                    onToggle={() => handleToggle(item.value)}
                                    key={item.id}
                                    id={item.id}
                                    checked={columnsValues.includes(item.value)}
                                >
                                    {highlightedContent}
                                </SortableItem>
                            );
                        })}
                    </SortableContext>
                </DndContext>
                {onUpdate.isSuccess && <div>Успешно</div>}
            </div>
        </div>
    );
};