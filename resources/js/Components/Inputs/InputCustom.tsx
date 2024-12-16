import React, {ChangeEvent, ChangeEventHandler, FunctionComponent} from 'react';
import {ISearchingFormItem} from "@/types/searchingFilters";
import {Control, Controller, FieldValues, UseFormRegister} from "react-hook-form";

interface IProps {
    className?: string
    inputData: ISearchingFormItem
    register: UseFormRegister<FieldValues>
    control?: Control
}

// обработчик разделяет введенное значение на пробелы и запятые и отдает в форму масси, даже если один элемент.
// также, если инпут грязный (ввели, а потом удалили), то в onChange передаем null иначе будет пустая строка и БЭК ее обработает
const handleChange= (onChange: (...args: any[]) => void) => {
    return (e:ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        !value ? onChange(null) : onChange(value.split(/[\s,]+/))
    }
}
export const InputCustom: FunctionComponent<IProps> = ({className, inputData, register, control}) => {
    return (
        <Controller name={inputData.header}
                    defaultValue={[]}
                    control={control}
                    render={({field: {onChange, value}}) => (
            <div className={`${''} p-1 relative`}>
                <input type="text" id={inputData.header}
                       placeholder={"ololo"}
                       onChange={handleChange(onChange)}
                       className={
                           `ring-transparent
                                       appearance-none placeholder-transparent
                                       focus:ring-2 focus:ring-button-violet
                                       rounded-full w-full shadow-input-search border-0
                                       peer
                                       `}>
                </input>
                <label htmlFor={inputData.header}
                       className={`
                                        flex justify-center items-center w-full
                                        cursor-text select-none transition-all -z-[1]
                                        absolute top-0 translate-y-1/2 text-header-text left-0
                                        peer-focus:-z-[1] peer-placeholder-shown:z-[1]
                                    `}>
                    <svg aria-hidden="true"
                         className=" absolute translate-x-full mt-1 left-0 w-4 h-4"
                         fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className={"first-letter:capitalize"}>поиск</span>
                </label>
            </div>
        )}>
        </Controller>
    );
};
