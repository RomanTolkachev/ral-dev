import { FunctionComponent, useEffect, useLayoutEffect, useState } from 'react';
import config from '../../config';
import { values } from 'lodash';
import useRalColumns from '../../api/useRalColumns';
import { useUserInfo } from '../../hooks/useUserInfo';
import { Reorder } from 'motion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setSettings, TParams } from './api';
import { TRalModel } from '../../model/types';
import { useNavigate } from 'react-router';

interface Props {
    className?: string;

}

const RalSettings: FunctionComponent<Props> = ({ className }) => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { userId, isUserChecked } = useUserInfo();
    const { columns, isColumnsFetching } = useRalColumns(userId);

    const [fullList, setFullList] = useState([...columns, ...config.DEFAULT_COLUMNS.filter(item => !columns.includes(item))])
    const [columnsValues, setColumnsValues] = useState<TRalModel[]>(columns);

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

export default RalSettings;