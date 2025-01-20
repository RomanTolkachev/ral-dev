import React, { FunctionComponent } from 'react'
import { Control, Controller, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { ISearchingFormItem } from '@/types/searchingFilters'

interface IProps {
    className?: string
    register?: UseFormRegister<FieldValues>
    control?: Control
    inputData: ISearchingFormItem
}

export const CalendarInput: FunctionComponent<IProps> = ({ className, inputData }) => {
    const { control } = useFormContext()

    function handleChange(e, onChange: (...args: any[]) => void) {
        return e.target.value
    }

    return (
        <Controller
            name={inputData.header}
            control={control}
            render={({ field }) => (
                <div className={`${className} p-1`}>
                    <input
                        type="date"
                        onChange={(e) => field.onChange(handleChange(e))}
                        className={
                            'bg-input-primary text-input-text w-full appearance-none rounded-full shadow-input-search border-0 ' +
                            ' ring-transparent' +
                            ' focus:ring-2 focus:ring-button-violet'
                        }
                    />
                </div>
            )}></Controller>
    )
}
