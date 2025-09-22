import {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomCellContext } from "@/shared/ui/Table/providers/CustomFormProvider";
import {
    createUniqueWithId,
    getAvailableColumns,
    getDefaultColumns,
    getUserColumns,
    setColumns,
} from "../lib";
import { useNavigate } from "react-router-dom";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { AxiosError } from "axios";
import highlight from "../../../../../highlightText";
import { Input } from "@/Components/Inputs/Input";
import { MainButton } from "@/shared/ui/Buttons/MainButton";

interface Props {
    className?: string;
}

interface SavedState {
    fullList: { value: string; id: UniqueIdentifier }[];
    columnsValues: string[];
}

export const Settings: FunctionComponent<Props> = ({ className }) => {
    const navigate = useNavigate();
    const cellContext = useContext(CustomCellContext);
    const queryClient = useQueryClient();

    const initialSettings = useRef<SavedState | null>(null);

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    if (!cellContext || !cellContext.config) return null;

    const {
        config: { HIDDEN_COLUMNS, TABLE_NAME, DICTIONARY },
    } = cellContext;

    const { data: availableColumns = [], isFetching: isAvailableColumnsFetching } = useQuery<
        string[],
        AxiosError
    >({
        queryKey: ["available", TABLE_NAME],
        queryFn: () => getAvailableColumns(TABLE_NAME),
        retry: (count, err) => ([401, 404].includes(err.status!) ? false : true),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const { data: defaultColumns = [] } = useQuery<string[], AxiosError>({
        queryKey: ["default_columns", TABLE_NAME],
        queryFn: () => getDefaultColumns(TABLE_NAME),
        retry: (count, err) => ([401, 404].includes(err.status!) ? false : true),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const { data: selectedColumns = [], isFetching: isSelectedColumnsFetching } = useQuery<
        string[],
        AxiosError
    >({
        queryKey: ["selected", TABLE_NAME],
        queryFn: () => getUserColumns(TABLE_NAME),
        retry: (count, err) => ([401, 404].includes(err.status!) ? false : true),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    });

    const [fullList, setFullList] = useState<{ value: string; id: UniqueIdentifier }[]>([]);
    const [columnsValues, setColumnsValues] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const availableColumnsString = useMemo(() => JSON.stringify(availableColumns), [availableColumns]);
    const selectedColumnsString = useMemo(() => JSON.stringify(selectedColumns), [selectedColumns]);
    const defaultColumnsString = useMemo(() => JSON.stringify(defaultColumns), [defaultColumns]);

    useEffect(() => {
        if (availableColumns.length > 0 && selectedColumns.length > 0 && !initialSettings.current) {
            const initialFullList = createUniqueWithId({
                arrays: [selectedColumns, availableColumns],
                exclude: HIDDEN_COLUMNS,
            });
            setFullList(initialFullList);
            setColumnsValues(selectedColumns);
            initialSettings.current = { fullList: initialFullList, columnsValues: [...selectedColumns] };
        }
    }, [availableColumnsString, selectedColumnsString, HIDDEN_COLUMNS]);

    const sortColumnsByDefault = useCallback(
        (columns: string[]) => {
            const defaultSet = new Set(defaultColumns);
            const defaultOrdered = columns.filter((col) => defaultSet.has(col));
            const others = columns.filter((col) => !defaultSet.has(col));
            const sortedDefaults = defaultColumns.filter((col) => defaultOrdered.includes(col));
            return [...sortedDefaults, ...others];
        },
        [defaultColumnsString]
    );

    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return fullList;
        const query = searchQuery.toLowerCase().trim();
        return fullList.filter((item) => {
            const displayName = DICTIONARY[item.value] ?? item.value;
            return displayName.toLowerCase().includes(query);
        });
    }, [fullList, searchQuery, DICTIONARY]);

    const onUpdate = useMutation({
        mutationFn: (params: { settings: string[] }) => setColumns(params, TABLE_NAME),
        onSuccess: () => {
            queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === TABLE_NAME });
            queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === "selected" });
            queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === "available" });
            queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === "filters" });
            setTimeout(() => navigate(-1), 1000);
        },
    });

    const getPos = (id: UniqueIdentifier) => fullList.findIndex((item) => item.id === id);

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
        document.body.classList.add("dragging");
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        document.body.classList.remove("dragging");
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setFullList((prev) => {
            const originalPos = getPos(active.id);
            const newPos = getPos(over.id);
            if (originalPos === -1 || newPos === -1) return prev;
            return arrayMove(prev, originalPos, newPos);
        });
    };

    const handleToggle = (value: string) => {
        setColumnsValues((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleSetDefault = () => {
        setColumnsValues(defaultColumns);
        setFullList((prev) => {
            const sortedValues = sortColumnsByDefault(prev.map((item) => item.value));
            const itemMap = new Map(prev.map((item) => [item.value, item]));
            return sortedValues.filter((v) => itemMap.has(v)).map((v) => itemMap.get(v)!);
        });
        setSearchQuery("");
    };

    const handleSelectAll = () => {
        setColumnsValues(availableColumns);
        setSearchQuery("");
    };

    const handleClearAll = () => {
        setColumnsValues([]);
        setSearchQuery("");
    };

    const handleRevert = () => {
        if (initialSettings.current) {
            setFullList([...initialSettings.current.fullList]);
            setColumnsValues([...initialSettings.current.columnsValues]);
        }
        setSearchQuery("");
    };

    const handleSend = () =>
        onUpdate.mutate({
            settings: [
                ...fullList.filter((item) => columnsValues.includes(item.value)).map((item) => item.value),
                ...HIDDEN_COLUMNS,
            ],
        });

    const hasChanges = useMemo(() => {
        if (!initialSettings.current) return false;
        const valuesChanged =
            JSON.stringify(columnsValues) !== JSON.stringify(initialSettings.current.columnsValues);
        const orderChanged =
            JSON.stringify(fullList.map((i) => i.value)) !==
            JSON.stringify(initialSettings.current.fullList.map((i) => i.value));
        return valuesChanged || orderChanged;
    }, [columnsValues, fullList]);

    if (isAvailableColumnsFetching || isSelectedColumnsFetching) return <div>загрузка</div>;
    if (availableColumns.length === 0) return <div>нет доступных колонок</div>;

    const activeItem = activeId ? fullList.find((i) => i.id === activeId) : null;

    return (
        <div className="flex flex-col h-full">
            <div className="shrink-0 text-header-text flex px-14 items-center pb-10 justify-between">
                <Input id="search" className="w-48" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <div className="flex gap-2 items-center">
                    <MainButton className="" isDisabled={onUpdate.isPending || !hasChanges} color={"violet"} onClick={handleSend}>
                        {onUpdate.isPending ? "Отправка..." : "Сохранить"}
                    </MainButton>
                    <MainButton className="" onClick={handleSelectAll} color="white">выделить все</MainButton>
                    <MainButton className="" onClick={handleClearAll} color="white">очистить все</MainButton>
                    <MainButton className="" onClick={handleSetDefault} color="white">по умолчанию</MainButton>
                    <MainButton className="" onClick={handleRevert} isDisabled={!hasChanges} color="white">вернуть как было</MainButton>
                </div>
            </div>

            <div className={`${className} flex-1 columns-2 overflow-y-auto overflow-x-hidden px-14`}>
                <DndContext
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                    sensors={sensors}
                >
                    <SortableContext items={fullList} strategy={rectSortingStrategy}>
                        {filteredList.map((item) => {
                            const displayName = DICTIONARY[item.value] ?? item.value;
                            const highlightedContent = highlight(displayName, searchQuery);
                            return (
                                <SortableItem
                                    key={item.id}
                                    id={item.id}
                                    checked={columnsValues.includes(item.value)}
                                    onToggle={() => handleToggle(item.value)}
                                    activeId={activeId}
                                >
                                    {highlightedContent}
                                </SortableItem>
                            );
                        })}
                    </SortableContext>

                    <DragOverlay>
                        {activeItem && (
                            <div
                                className="flex items-center select-none rounded shadow-lg bg-white px-2 py-1 max-w-full overflow-hidden"
                                style={{
                                    cursor: "grabbing",
                                    opacity: 0.8,
                                    transform: "scale(1.05)",
                                    pointerEvents: "none",
                                    zIndex: 9999,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {highlight(DICTIONARY[activeItem.value] ?? activeItem.value, searchQuery)}
                            </div>
                        )}
                    </DragOverlay>
                </DndContext>

                {onUpdate.isSuccess && <div>Успешно</div>}
            </div>
        </div>
    );
};
