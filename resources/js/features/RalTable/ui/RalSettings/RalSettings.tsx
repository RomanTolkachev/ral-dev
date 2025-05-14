import React, { FunctionComponent, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import config from '../../config';
import { keys, values } from 'lodash';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { div } from 'motion/react-client';
import useRalColumns from '../../api/useRalColumns';
import { useUserInfo } from '../../hooks/useUserInfo';
import { Reorder } from 'motion/react';
import { useMutation } from '@tanstack/react-query';
import { setSettings, TParams } from './api';
import { TRalModel } from '../../model/types';

interface Props {
    className?: string;

}

const RalSettings: FunctionComponent<Props> = ({ className }) => {

    const { userId, isUserChecked } = useUserInfo();
    const { columns, isColumnsFetching } = useRalColumns(userId);
   
    const [fullList, setFullList] = useState([...columns, ...config.DEFAULT_COLUMNS.filter(item => !columns.includes(item))])
    const [columnsValues, setColumnsValues] = useState<TRalModel[]>(columns);

    useLayoutEffect(() => {
        setColumnsValues(columns)
    }, [columns])
    
    console.log(fullList.filter(item => columnsValues.includes(item)))

    const onUpdate = useMutation({
        mutationFn: (params: TParams) => setSettings(params),
    });

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
                                onChange={ () =>
                                    setColumnsValues(prevState => {
                                        if (prevState.includes(item)) {
                                            return prevState.filter(column => column !== item);
                                        } else {
                                            return [...prevState, item];
                                        }
                                    })      
                                } 
                                checked={columnsValues.includes(item)}/>
                            <span>{item}</span>
                        </Reorder.Item>
                    )
                })}
                </Reorder.Group>
                <button onClick={() => onUpdate.mutate({userId, settings: fullList.filter(item => columnsValues.includes(item))})}>отправить</button>
        </div>
    );
};

export default RalSettings;