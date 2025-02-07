import { ChangeEvent, FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { enterExitAnimation as animationParams } from '@/shared/framer-motion/enter-exit-animation'
import { isEqual } from 'lodash'
import dateRangeValidation from './lib/dateRangeValidation'
import { SVG } from '@/Components/utils/SVG'
import DEFAULT_REQUEST from '@/features/ralTable/config'
import { MainButton } from '@/Components/Buttons/MainButton'
import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'
import { AnimatePresence, motion } from 'motion/react'
import openCalendarPicker from './lib/openCalendarPicker'

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
    const { control, formState, getValues, } = useFormContext();
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext);

    const { isValid, } = formState;
    const inputName = inputData.header;
    const defaultValue = formState.defaultValues ? formState.defaultValues[inputName] : ["",""];

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
        return [e.target.value, endDate];
    }
    function handleMaxChange(e: ChangeEvent<HTMLInputElement>) {
        setEndDate(e.target.value);
        return [startDate, e.target.value];
    }

    return (
        <Controller
            name={inputName}
            control={control}
            rules={{ validate: dateRangeValidation }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className={`${className} p-1 space-y-2 text-input-text`}>
                    <div className='custom-date w-full !flex items-center gap-4'>
                        <span className='select-none'>от</span>
                        <input
                            type="date"
                            value={value ? value[0] : DEFAULT_REQUEST.status_change_date[0]}
                            onChange={(e) => { onChange(handleMinChange(e)) }}
                            className={
                                `${formState.errors[inputName] && 'ring-2 !ring-error border-transparent '}` +
                                ' bg-input-primary text-input-text appearance-none rounded-full shadow-input-search border-0' +
                                ' ring-transparent' +
                                ' focus:ring-2 focus:ring-button-violet'
                            }
                        />
                        <SVG clickHandler={openCalendarPicker} schedule className='calendar-icon w-6' />
                    </div>
                    <div className='custom-date w-full !flex items-center gap-4'>
                        <span className='select-none'>до</span>
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
                        <SVG clickHandler={(e: any) => openCalendarPicker(e)} schedule className='calendar-icon w-6' />
                    </div>
                    <AnimatePresence>
                        {error && error.message &&
                            <motion.div {...animationParams} className='text-error text-center'>
                                {error.message}
                            </motion.div>}
                    </AnimatePresence>
                    <MainButton
                        onClick={(e: MouseEvent) => { e.preventDefault(); customSubmitHandler(getValues()) }}
                        isDisabled={isEqual(value, defaultValue || !isValid )}
                        color='violet'
                        className={`w-full mx-auto ${isEqual(value, defaultValue) || !isValid ? "bg-gray-400" : ""}`}>
                        Применить
                    </MainButton>
                </div>
            )}>
        </Controller>
    );
}

