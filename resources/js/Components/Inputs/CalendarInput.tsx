import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { ISearchingFormItem } from '@/types/searchingFilters'
import moment from 'moment'
import useParamsCustom from '@/services/hooks/useParamsCustom'
import { isEqual } from 'lodash'


interface IProps {
    className?: string
    register?: UseFormRegister<FieldValues>
    control?: Control
    inputData: ISearchingFormItem
}

export const CalendarInput: FunctionComponent<IProps> = ({ className, inputData }) => {
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().subtract(2, 'weeks').format("YYYY-MM-DD"));
    const [, getQuery] = useParamsCustom()
    const { control, setValue } = useFormContext();

    const query = getQuery();
    

    // логика проверки изменения query параметров при изменении popstate
    const prevValueRef = useRef<any>();
    useEffect(() => {
        if (!isEqual(query, prevValueRef.current)) {
            console.log("изменились")
            if (query[inputData.header]) {
                setStartDate(query[inputData.header][0])
                setEndDate(query[inputData.header][1])
            }
        }
        prevValueRef.current = query
    }, [query])


    function handleMinChange(e: ChangeEvent<HTMLInputElement>) {
        setStartDate(e.target.value)
        return [e.target.value, endDate]
    }
    function handleMaxChange(e: ChangeEvent<HTMLInputElement>) {
        setEndDate(e.target.value);
        return [startDate, e.target.value]
    }


    // Устанавливаем значение по имолчанию, когда фильтры получены 
    useEffect(() => { //TODO: вынести это куда-то выше ?
        if (query[inputData.header]) {
            setStartDate(query[inputData.header][0])
            setEndDate(query[inputData.header][1])
            // setValue(inputData.header, query[inputData.header])
            return;
        };
        if (control._defaultValues[inputData.header]) {
            setValue(inputData.header, [startDate, endDate])
        }
    }, [control._defaultValues])


    return (
        <Controller
            name={inputData.header}
            control={control}
            // rules={{validate: value => value[0] <= value[2] || "Начальная дата должна быть больше конечной"}}
            render={({ field }) => (
                <div className={`${className} p-1 space-y-1`}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => field.onChange(handleMinChange(e))}
                        className={
                            'bg-input-primary text-input-text w-full appearance-none rounded-full shadow-input-search border-0 ' +
                            ' ring-transparent' +
                            ' focus:ring-2 focus:ring-button-violet'
                        }
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => field.onChange(handleMaxChange(e))}
                        className={
                            'bg-input-primary text-input-text w-full appearance-none rounded-full shadow-input-search border-0 ' +
                            ' ring-transparent' +
                            ' focus:ring-2 focus:ring-button-violet'
                        }
                    />
                </div>
            )}>
        </Controller>
    )
}
function getQuery() {
    throw new Error('Function not implemented.')
}

