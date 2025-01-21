import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { ISearchingFormItem } from '@/types/searchingFilters'
import moment from 'moment'
import useParamsCustom from '@/services/hooks/useParamsCustom'
import { isEqual } from 'lodash'
import isStartLessEnd from './features/isStartLessEnd'
import { SVG } from '@/Components/utils/SVG'


interface IProps {
    className?: string
    register?: UseFormRegister<FieldValues>
    control?: Control
    inputData: ISearchingFormItem
}

export const CalendarInput: FunctionComponent<IProps> = ({ className, inputData }) => {
    const [startDate, setStartDate] = useState(moment().subtract(2, 'weeks').format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [, getQuery] = useParamsCustom()
    const query = getQuery();
    const { control, setValue, formState, trigger } = useFormContext();
    

    // логика проверки изменения query параметров при изменении popstate
    const prevValueRef = useRef<any>();
    useEffect(() => {
        if (!isEqual(query, prevValueRef.current)) {
            if (query[inputData.header]) {
                setStartDate(query[inputData.header][0]);
                setEndDate(query[inputData.header][1]);
            }
        }
        prevValueRef.current = query;
    }, [query]);


    function handleMinChange(e: ChangeEvent<HTMLInputElement>) {
        setStartDate(e.target.value);
        trigger(); // для того, чтобы валидация срабатывала на onchange
        return [e.target.value, endDate];
    }
    function handleMaxChange(e: ChangeEvent<HTMLInputElement>) {
        setEndDate(e.target.value);
        trigger();
        return [startDate, e.target.value];
    }


    // Устанавливаем значение по имолчанию, когда фильтры получены 
    useEffect(() => { //TODO: вынести это куда-то выше ?
        if (query[inputData.header]) {
            setStartDate(query[inputData.header][0]);
            setEndDate(query[inputData.header][1]);
            return;
        };
        if (control._defaultValues[inputData.header]) {
            setValue(inputData.header, [startDate, endDate]);
        }
    }, [control._defaultValues]);


    function handleIconClick(e: React.MouseEvent<SVGSVGElement>): void {
        const parent: HTMLElement | null = e.currentTarget.parentElement;
        if (parent) {
            let input = parent.querySelector('input');
            input?.showPicker();
        }
    }

    
    return (
        <Controller
            name={inputData.header}
            control={control}
            rules={{validate: value => isStartLessEnd(value) || "Начальная дата должна быть больше конечной"}}
            render={({ field }) => (
                <div className={`${className} p-1 space-y-2 text-input-text`}>
                    <div className='custom-date w-full '>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => field.onChange(handleMinChange(e))}
                            className={
                                `${formState.errors[inputData.header] && 'ring-2 ring-error border-transparent '}` +
                                ' bg-input-primary text-input-text w-full appearance-none rounded-full shadow-input-search border-0' +
                                ' ring-transparent' +
                                ' focus:ring-2 focus:ring-button-violet'
                            }
                        />
                        <SVG clickHandler={(e: any)  => handleIconClick(e)} schedule className='calendar-icon w-6'/> 
                    </div>
                    <div className='custom-date w-full'>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => field.onChange(handleMaxChange(e))}
                            className={
                                `${formState.errors[inputData.header] && 'ring-2 ring-error border-transparent '}` +
                                ' bg-input-primary  text-input-text w-full appearance-none rounded-full shadow-input-search border-0 pl-5' +
                                ' ring-transparent' +
                                ' focus:ring-2 focus:ring-button-violet'
                            }
                        />
                        <SVG clickHandler={(e: any)  => handleIconClick(e)} schedule className='calendar-icon w-6'/> 
                    </div>

                </div>
            )}>
        </Controller>
    );
}

