import { FunctionComponent, useContext } from 'react'
import { v4 } from 'uuid'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { Controller, useFormContext } from 'react-hook-form'
import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'


interface IProps {
    className?: string
    inputData: ISearchingFormItem
}

export const CheckBoxCustom: FunctionComponent<IProps> = ({ className, inputData }) => {

    const { control, getValues } = useFormContext();
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext)
    const inputName = inputData.header;

const handleChange = (checked: boolean, name: string) => {
        if (checked) {
            return [...getValues(inputName), name];
        } else {
            return getValues(inputName).filter((item: string) => item !== name);
        }
    }

    return (
        <div className={`${className} flex flex-col pl-3 pr-3 pt-3 max-h-32 overflow-y-auto thumb-secondary space-y-1`}>
            {inputData.sortValues!.checkboxValues!.map((item, key) => {
                const id = v4()
                return (
                    <Controller
                        key={`cb-${key}`}
                        name={inputName}
                        control={control}
                        render={({ field: {onChange, value = []} }) => (
                            <div
                                className={
                                    'flex items-center border-b last:border-b-0 py-2 border-checkbox-custom-border text-gray-light-gray'
                                }>
                                <label className={'pr-2'} 
                                    htmlFor={item ? item : id}>
                                    {item ? item : 'пустые'}
                                </label>
                                <input
                                    checked={value.includes(item)}
                                    className={
                                        'ml-auto checked:text-checkbox-custom' +
                                        ' outline-none border focus:ring-checkbox-ring focus:ring-offset-0 rounded active:border-transparent ' +
                                        ' focus:outline-none ' +
                                        'bg-background-block'
                                    }
                                    type="checkbox"
                                    onChange={e => {
                                        onChange(handleChange(e.target.checked, item)); // onchange записывает значение в react-hook-form
                                        customSubmitHandler(getValues()) // сабмитим обновленное состояние формы
                                    } }
                                />
                            </div>
                        )}
                    >
                    </Controller>
                )
            })}
        </div>
    )
}
