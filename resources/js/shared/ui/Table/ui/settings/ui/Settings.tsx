import { FunctionComponent, useContext, useLayoutEffect, useState } from 'react';
import { Reorder } from 'motion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomCellContext } from '@/shared/ui/Table/providers/AbstractFormProvider';
import { fetchAwailableColumns, fetchSelectedColumns, setColumns } from '../lib';
import { useNavigate } from 'react-router-dom';

interface Props {
    className?: string;
}

export const Settings: FunctionComponent<Props> = ({ className }) => {
    const navigate = useNavigate();
    const cellContext = useContext(CustomCellContext);

    if (!cellContext || !cellContext.config) {
        return null;
    }

    const { config: { HIDDEN_COLUMNS, TABLE_NAME } } = cellContext;
    const queryClient = useQueryClient();

    const { availableColumns, isAvailableColumnsFetching } = fetchAwailableColumns(TABLE_NAME);
    const { selectedColumns, isSelectedColumnsFetching } = fetchSelectedColumns(TABLE_NAME);

    const [fullList, setFullList] = useState<string[]>([]);
    const [columnsValues, setColumnsValues] = useState<string[]>([]);

    useLayoutEffect(() => {
        if (availableColumns.length > 0 && selectedColumns.length > 0) {
            const uniqueColumns = [...new Set([...selectedColumns, ...availableColumns])].filter(item => !HIDDEN_COLUMNS.includes(item));
            setFullList(uniqueColumns);
        }
    }, [availableColumns, selectedColumns]);

    useLayoutEffect(() => {
        if (selectedColumns.length > 0) {
            setColumnsValues(selectedColumns);
        }
    }, [selectedColumns]);

    const onUpdate = useMutation({
        mutationFn: (params: { settings: string[] }) => setColumns(params, TABLE_NAME),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === TABLE_NAME
                },
            })
            setTimeout(() => navigate(-1), 1000)
        }
    });

    // Ждем загрузки И наличия данных
    if (isAvailableColumnsFetching || isSelectedColumnsFetching) {
        return <div>загрузка</div>
    }

    if (availableColumns.length === 0) {
        return <div>нет доступных колонок</div>;
    }

    return (
        <div className={`${className} `}>
            <Reorder.Group axis="y" values={fullList} onReorder={setFullList}>
                {fullList.map((item) => {
                    return (
                        <Reorder.Item key={item} value={item} className='text-table-base'>
                            <input
                                type="checkbox"
                                onChange={() =>
                                    setColumnsValues(prevState => {
                                        if (prevState.includes(item)) {
                                            return prevState.filter(column => column !== item);
                                        } else {
                                            return [...prevState, item];
                                        }
                                    })
                                }
                                checked={columnsValues.includes(item)}
                            />
                            <span>{item}</span>
                        </Reorder.Item>
                    )
                })}
            </Reorder.Group>
            <button
                className='text-header-text'
                onClick={() => onUpdate.mutate({ 
                    settings: fullList.filter(item => columnsValues.includes(item)) 
                })}
                disabled={onUpdate.isPending}
            >
                {onUpdate.isPending ? 'Отправка...' : 'Отправить'}
            </button>
            {onUpdate.isSuccess && <div>Успешно</div>}
        </div>
    );
};
