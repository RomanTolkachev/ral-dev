import { ChangeEvent, FunctionComponent } from 'react'
import { ISearchingFormItem } from '@/shared/types/searchingFilters.js'
import { Control, Controller, useFormContext } from 'react-hook-form'
import { SVG } from '@/Components/utils/SVG.tsx'
import splitValue from './features/splitValue.ts'
import joinValue from './features/joinValue.ts'
import useParamsCustom from '@/shared/query/useParamsCustom.ts'

interface IProps {
    className?: string
    inputData: ISearchingFormItem
    control?: Control
    setFirstPage?: any
}

/* Значения передаваемые из данного input разбиваются в массив для отправки на БЭК, поэтому в handler значение обернуто в
функцию splitValue. Функция joinValue нужна для того, чтобы при обновлении страницы, корректно собрать значение из
query параметров обратно в input*/

export const InputCustom: FunctionComponent<IProps> = ({ className, inputData }) => {

    const [, getQuery] = useParamsCustom()
    
    const handleChange = (onChange: (...args: any[]) => void) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            onChange(splitValue(value))
        }
    }

    const { control } = useFormContext();

    const queries = getQuery();

    return (
        <Controller
            name={inputData.header}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div className={`${className} p-1 relative`}>
                    <input
                        type="text"
                        id={inputData.header}
                        value={joinValue(value) || ''}
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
