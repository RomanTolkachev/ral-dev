import React, {ChangeEvent, FunctionComponent} from 'react';
import {v4} from "uuid";
import {ISearchingFormItem} from "@/types/searchingFilters";
import {FieldValues, UseFormRegister} from "react-hook-form";
import {PayloadAction} from "@reduxjs/toolkit";

interface IProps {
    className?: string
    inputData: ISearchingFormItem
    register: UseFormRegister<FieldValues>
    setFirstPage: () => PayloadAction<number>
}

export const CheckBoxCustom: FunctionComponent<IProps> = ({className, inputData, register, setFirstPage}) => {

    //функция, сбрасывающая пагинацию при изменении input
    const handleChange= (e:ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (!value) {
            return
        } else {
            setFirstPage();
        }
    }

    return (
        <div className={`${className} flex flex-col pl-3 pr-3 pt-3 max-h-32 overflow-y-auto thumb-secondary space-y-1`}>
            {inputData.sortValues.checkboxValues!.map((item, key) => {
                const id = v4();
                return (
                    <div key={key} className={'flex items-center border-b last:border-b-0 py-2 border-gray-200'}>
                        <label className={'pr-2'}
                               htmlFor={item ? item : id}
                        >
                            {item ? item : "пустые"}
                        </label>
                        <input
                               value={item ? item : false}
                               className={'ml-auto checked:text-checkbox-custom border-[2px] rounded focus:ring-transparent'}
                               type='checkbox'
                               {...register(inputData.header, {onChange: handleChange})}
                               name={inputData.header}
                        />
                    </div>
                )
            })}
        </div>
    );
};
