import { FunctionComponent, useContext, useLayoutEffect, useState } from 'react';
import { values } from 'lodash';
import { Reorder } from 'motion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { CustomCellContext } from '@/shared/api/AbstractFormProvider';
import { fetchColumns, setColumns } from '../lib';

interface Props {
    className?: string;

}

const RalSettings: FunctionComponent<Props> = ({ className }) => {

    const navigate = useNavigate();

    const cellContext = useContext(CustomCellContext);
    if (!cellContext || !cellContext.config) {
        return null;
    }
    const { config: { HIDDEN_COLUMNS, TABLE_NAME } } = cellContext;

    const queryClient = useQueryClient();

    const { fetchedColumns, isColumnsFetching } = fetchColumns(TABLE_NAME);

    const [fullList, setFullList] = useState([...fetchedColumns, ...config.DEFAULT_COLUMNS.filter(item => !columns.includes(item))])
    const [columnsValues, setColumnsValues] = useState<string[]>(fetchedColumns);

    const onUpdate = useMutation({
        mutationFn: (params: TParams) => setColumns(params,),
        onSuccess: () => {
            queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "ralColumns" })
            setTimeout(() => navigate(-1), 1000)
        }
    });

    useLayoutEffect(() => {
        setColumnsValues(fetchedColumns)
    }, [fetchedColumns])


    if (isColumnsFetching ) {
        return <div>загрузка</div>
    }

    return (
        <div className={`${className} `}>
            <Reorder.Group axis="y" values={fullList} onReorder={setFullList}>
                {values(fullList).map((item, key) => {
                    return (
                        <Reorder.Item key={item} value={item}>
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
                                checked={columnsValues.includes(item)} />
                            <span>{item}</span>
                        </Reorder.Item>
                    )
                })}
            </Reorder.Group>
            <button onClick={() => onUpdate.mutate({ userId, settings: fullList.filter(item => columnsValues.includes(item)) })}>отправить</button>
            {onUpdate.isSuccess && <div>Успешно</div>}
        </div>
    );
};

export default RalSettings;