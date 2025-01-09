import React, { ChangeEvent, FunctionComponent, useEffect } from 'react'
import { ISearchingFormItem } from '@/types/searchingFilters'
import { Control, Controller, useFormContext } from 'react-hook-form'
import { SVG } from '@/Components/utils/SVG.tsx'

interface IProps {
    className?: string
    inputData: ISearchingFormItem
    control?: Control
    setFirstPage?: any
}

export const InputCustom: FunctionComponent<IProps> = ({ className, inputData, setFirstPage }) => {
    const handleChange = (onChange: (...args: any[]) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value.trim()
            if (!value) {
                return
            } else {
                setFirstPage()
            }
            !value ? onChange(null) : onChange(value.split(/[\s,;]+/))
        }
    }

    const { control } = useFormContext()

    return (
        <Controller
            name={inputData.header}
            defaultValue=""
            control={control}
            render={({ field: { onChange } }) => (
                <div className={`${className} p-1 relative`}>
                    <input
                        type="text"
                        id={inputData.header}
                        defaultValue={''}
                        placeholder={''}
                        onChange={handleChange(onChange)}
                        className={`ring-transparent
                            appearance-none placeholder-transparent
                            focus:ring-2 focus:ring-button-violet
                            rounded-full w-full shadow-input-search border-0
                            peer bg-input-primary text-input-text
                            autofill:bg-red-200 focus:autofill:bg-red-200`}></input>
                    <label
                        htmlFor={inputData.header}
                        className={`
                            flex justify-center items-center w-full
                            cursor-text select-none transition-all -z-[1]
                            absolute top-0 translate-y-1/2 left-0
                            peer-focus:-z-[1] peer-placeholder-shown:z-[1] text-input-text `}>
                        <SVG magnifyingGlass className={'absolute translate-x-full left-0 w-4 h-4'} />
                        <span className={'first-letter:capitalize'}>поиск</span>
                    </label>
                </div>
            )}></Controller>
    )
}
