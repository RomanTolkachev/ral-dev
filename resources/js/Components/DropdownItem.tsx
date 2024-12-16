import React, {FunctionComponent, memo, useState} from 'react';
import {DropdownFilterButton} from "@/Components/Buttons/DropdownFilterButton";
import {motion, Variants} from "framer-motion"
import {ISearchingFormItem} from "@/types/searchingFilters";
import {v4} from "uuid";
import {InputCustom} from "@/Components/Inputs/InputCustom";
import {Control, FieldValues, UseFormRegister} from "react-hook-form";

interface IProps {
    className?: string
    name?: string
    inputData: ISearchingFormItem
    register: UseFormRegister<FieldValues>
    control: Control
}

const listVariants: Variants = {
    open: {
        height: 'fit-content',
        transition: {
            type: "spring",
            ease: "easeInOut",
            duration: 0.25,
        },
    },
    closed: {
        height: 0,
        transition: {
        duration: 0.15
        },
    },
};

const itemVariants: Variants = {
    closed: {},
    open: {},
};

export const DropdownItem: FunctionComponent<IProps> = memo(({name, inputData, className, control, register}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <motion.div initial={"closed"} animate={isOpen ? "open" : "closed"} variants={itemVariants} className={`${className} h-fit`}>
            <DropdownFilterButton clickHandler={() => setIsOpen(!isOpen)} className={"mb-2"} isOpen={isOpen} children={name}/>
            <motion.div className={"overflow-hidden"} variants={listVariants}>
                {inputData.sortValues.type === "huge" && (
                    <InputCustom inputData={inputData} control={control} register={register}/>
                )}
                {inputData.sortValues.type === "date" && <span>сделать компонент для дат</span>}
                {inputData.sortValues.type === "checkBox" && (
                    <div className={"flex flex-col pl-3 pr-3 pt-3 max-h-32 overflow-y-auto thumb-secondary space-y-1"}>
                        {inputData.sortValues.checkboxValues!.map((item, key) => {
                            const id= v4();
                            return (
                                <div key={key} className={'flex items-center border-b last:border-b-0 py-2 border-gray-200'}>
                                    <label className={'pr-2'}
                                           htmlFor={item ? item : id}
                                    >
                                            {item ? item : "пустые"}
                                    </label>
                                    <input {...register(inputData.header)} value={item ? item : false} className={'ml-auto checked:text-checkbox-custom border-[2px] rounded focus:ring-transparent'} type='checkbox' name={inputData.header}/>
                                </div>
                            )
                        })}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
});
