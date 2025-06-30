import { FunctionComponent, useContext, useEffect, useLayoutEffect } from 'react'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { Controller, useFormContext } from 'react-hook-form'
import { CustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider'


interface IProps {
    className?: string
    inputData: ISearchingFormItem
}

export const CheckBoxCustom: FunctionComponent<IProps> = ({ className, inputData }) => {

    const { control, getValues } = useFormContext();
    const handlers = useContext(CustomSubmitHandlerContext)
    if (!handlers) return null
    const {customSubmitHandler} = handlers

    const inputName = inputData.header;

    const handleChange = (checked: boolean, name: string) => {
        const nameNoEmptyString: string = name === null ? "пустые" : name
        if (checked) {
            return [...getValues(inputName), nameNoEmptyString ];
        } else {
            return getValues(inputName).filter((item: string) => item !== nameNoEmptyString);
        }
    }

    return (
        <div className={`${className} flex flex-col pl-3 pr-3 pt-3 max-h-32 overflow-y-auto thumb-secondary space-y-1`}>
            {inputData.sortValues!.checkboxValues!.map((item, key) => {

                if (!item) {
                    item = "Пустые"
                }

                return (
                    <Controller
                        key={`cb-${key}`}
                        name={inputName}
                        control={control}
                        render={({ field: {onChange, value = []} }) => {
                           return (
                            <div
                                className={
                                    'flex items-center border-b last:border-b-0 py-2 border-checkbox-custom-border text-gray-light-gray'
                                }>
                                <span className={'pr-2'} > 
                                    {item}
                                </span>
                                <input
                                    checked={value.includes(item)}
                                    className={
                                        'ml-auto cursor-pointer checked:text-checkbox-custom' +
                                        ' outline-none border focus:ring-checkbox-ring focus:ring-offset-0 rounded active:border-transparent ' +
                                        ' focus:outline-none ' +
                                        'bg-background-block'
                                    }
                                    type="checkbox"
                                    onChange={e => {
                                        onChange(handleChange(e.target.checked, item));
                                        customSubmitHandler(getValues())
                                    }}
                                />
                            </div>
                        )
                        } }
                    >
                    </Controller>
                )
            })}
        </div>
    )
}
