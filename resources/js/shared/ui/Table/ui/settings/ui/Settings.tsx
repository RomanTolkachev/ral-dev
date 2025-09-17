import { FunctionComponent, useContext, useEffect, useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomCellContext } from '@/shared/ui/Table/providers/CustomFormProvider';
import { createUniqueWithId, getAvailableColumns, getUserColumns, setColumns } from '../lib';
import { useNavigate } from 'react-router-dom';
import { closestCorners, DndContext, DragEndEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import { SortableItem } from './SortableItem';
import { AxiosError } from 'axios';

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
        staleTime: Infinity, // ← Отключаем "протухание"

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
        staleTime: Infinity, // ← Отключаем "протухание"

    });

    const [fullList, setFullList] = useState<{ value: string, id: UniqueIdentifier }[]>(availableColumns.length ? createUniqueWithId({arrays: [availableColumns], exclude: HIDDEN_COLUMNS}) : []);
    const [columnsValues, setColumnsValues] = useState<string[]>(selectedColumns.length ? selectedColumns : []);

    // Используем useMemo для стабильных ссылок на массивы
    const availableColumnsString = useMemo(() => JSON.stringify(availableColumns), [availableColumns]);
    const selectedColumnsString = useMemo(() => JSON.stringify(selectedColumns), [selectedColumns]);

    useEffect(() => {
        if (availableColumns.length > 0 && Array.isArray(selectedColumns)) {
            setFullList(createUniqueWithId({arrays: [selectedColumns, availableColumns], exclude: HIDDEN_COLUMNS}));
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

    if (isAvailableColumnsFetching || isSelectedColumnsFetching) {
        return <div>загрузка</div>;
    }

    if (availableColumns.length === 0) {
        return <div>нет доступных колонок</div>;
    }

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

    return (
        <div className={`${className} columns-2 overflow-x-hidden`}>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors} modifiers={[/* restrictToVerticalAxis */]}>
                <SortableContext items={fullList} strategy={/* verticalListSortingStrategy */rectSortingStrategy}>
                    {fullList.map((item) => (
                        <SortableItem
                            onToggle={() => handleToggle(item.value)}
                            key={item.id}
                            id={item.id}
                            checked={columnsValues.includes(item.value)}
                        >
                            {DICTIONARY[item.value] ?? item.value}
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
            <button
                className='text-header-text'
                onClick={() => onUpdate.mutate({
                    settings: [...fullList.filter(item => columnsValues.includes(item.value)).map(item => item.value), ...HIDDEN_COLUMNS]
                })}
                disabled={onUpdate.isPending}
            >
                {onUpdate.isPending ? 'Отправка...' : 'Отправить'}
            </button>
            {onUpdate.isSuccess && <div>Успешно</div>}
        </div>
    );
};

