import { FunctionComponent, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { values } from 'lodash';
import useRalColumns from '../../api/useRalColumns';
import { Reorder } from 'motion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setSettings, TParams } from './api';
import { useNavigate } from 'react-router';
import { AuthContext } from '@/app/providers/AuthProvider';

interface Props {
    className?: string;
    defaultColumns: string[]
}

const TableSettings: FunctionComponent<Props> = ({ className, defaultColumns }) => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {user} = useContext(AuthContext)

    if (!user) {
        return null
    }
    
    const { columns, isColumnsFetching } = useRalColumns(user.userId);

    const [fullList, setFullList] = useState([...columns, ...defaultColumns.filter(item => !columns.includes(item))])
    const [columnsValues, setColumnsValues] = useState<string[]>(columns);

    const onUpdate = useMutation({
        mutationFn: (params: TParams) => setSettings(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "ralColumns" })
            setTimeout(() => navigate(-1), 1000)
        } 
    });

    useLayoutEffect(() => {
        setColumnsValues(columns)
    }, [columns])


    if (!isUserChecked || isColumnsFetching || !userId) {
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

export default TableSettings;