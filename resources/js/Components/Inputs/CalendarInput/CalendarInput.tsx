import { ChangeEvent, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import { Control, Controller, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { ISearchingFormItem } from '@/types/searchingFilters'
import useParamsCustom from '@/services/hooks/useParamsCustom'
import { isEqual } from 'lodash'
import isStartLessEnd from './features/isStartLessEnd'
import { SVG } from '@/Components/utils/SVG'
import DEFAULT_REQUEST from '@/features/RalTable/config'


interface IProps {
    className?: string
    register?: UseFormRegister<FieldValues>
    control?: Control
    inputData: ISearchingFormItem
}

export const CalendarInput: FunctionComponent<IProps> = ({ className, inputData }) => {
    const [startDate, setStartDate] = useState(DEFAULT_REQUEST.status_change_date[0]);
    const [endDate, setEndDate] = useState(DEFAULT_REQUEST.status_change_date[1]);
    const [, getQuery] = useParamsCustom()
    const query = getQuery();
    const { control, setValue, formState, trigger, getValues, reset } = useFormContext();

    const inputName = inputData.header;

    // логика проверки изменения query параметров при изменении popstate
    const prevValueRef = useRef<any>();
    useEffect(() => {
        if (!isEqual(query, prevValueRef.current)) {
            if (query[inputName]) {
                setStartDate(query[inputName][0]);
                setEndDate(query[inputName][1]);
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

    function handleIconClick(e: React.MouseEvent<SVGSVGElement>): void {
        const parent: HTMLElement | null = e.currentTarget.parentElement;
        if (parent) {
            let input = parent.querySelector('input');
            input?.showPicker();
        }
    }

    function validationFn(value: Array<string> | undefined): boolean {
        if (!value) return true;
        if (!value[0] && !value[1]) return true;
        if (value[0] && !value[1]) return true;
        if (!value[0] && value[1]) return true;
        return isStartLessEnd(value)
    }

    return (
        <Controller
            name={inputName}
            control={control}
            rules={{ validate: value => validationFn(value) || "Начальная дата должна быть больше конечной" }}
            render={({ field: { value, onChange } }) => (
                <div className={`${className} p-1 space-y-2 text-input-text`}>
                    <div className='custom-date w-full '>
                        <input
                            type="date"
                            value={value ? value[0] : DEFAULT_REQUEST.status_change_date[0]}
                            onChange={(e) => onChange(handleMinChange(e))}
                            className={
                                `${formState.errors[inputName] && 'ring-2 !ring-error border-transparent '}` +
                                ' bg-input-primary text-input-text w-full appearance-none rounded-full shadow-input-search border-0' +
                                ' ring-transparent' +
                                ' focus:ring-2 focus:ring-button-violet'
                            }
                        />
                        <SVG clickHandler={(e: any) => handleIconClick(e)} schedule className='calendar-icon w-6' />
                    </div>
                    <div className='custom-date w-full'>
                        <input
                            type="date"
                            value={value ? value[1] : DEFAULT_REQUEST.status_change_date[1]}
                            onChange={(e) => onChange(handleMaxChange(e))}
                            className={
                                `${formState.errors[inputName] && 'ring-2 !ring-error border-transparent '}` +
                                ' bg-input-primary  text-input-text w-full appearance-none rounded-full shadow-input-search border-0 pl-5' +
                                ' ring-transparent' +
                                ' focus:ring-2 focus:ring-button-violet'
                            }
                        />
                        <SVG clickHandler={(e: any) => handleIconClick(e)} schedule className='calendar-icon w-6' />
                    </div>
                </div>
            )}>
        </Controller>
    );
}

