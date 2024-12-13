import React, {FunctionComponent, memo, useState} from 'react';
import {DropdownFilterButton} from "@/Components/Buttons/DropdownFilterButton";
import {motion, Variants} from "framer-motion"
import {ISearchingFormItem} from "@/types/searchingFilters";
import {randomUUID} from "node:crypto";
import {v4} from "uuid";

interface IProps {
    className?: string
    name?: string
    inputData: ISearchingFormItem
    register: any
}
// () => {
//     onChange: (e: React.ChangeEvent) => void,
//         onBlur: (e: React.FocusEvent) => void,
//         name: string,
//         ref: React.Ref<HTMLInputElement>
// }


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

export const DropdownItem: FunctionComponent<IProps> = memo(({name, inputData, className, register}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <motion.div initial={"closed"} animate={isOpen ? "open" : "closed"} variants={itemVariants} className={`${className} h-fit`}>
            <DropdownFilterButton clickHandler={() => setIsOpen(!isOpen)} className={"mb-2"} isOpen={isOpen} children={name}/>
            <motion.div className={"overflow-hidden"} variants={listVariants}>
                {inputData.sortValues.type === "huge" && (
                    <div className={'p-1 relative'}>
                        <input type="text" id={inputData.header}
                               {...register(inputData.header)}
                               placeholder={"ololo"}
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
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span className={""}>поиск</span>
                        </label>
                    </div>
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
                                        <input {...register(item ? item : id)} value={item ? item : id} className={'ml-auto checked:text-checkbox-custom border-[2px] rounded focus:ring-transparent'} type='checkbox' name={inputData.header}/>
                                    </div>
                            )
                        })}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
});