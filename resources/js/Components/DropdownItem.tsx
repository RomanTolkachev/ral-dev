import React, {FunctionComponent, memo, useState} from 'react';
import {DropdownFilterButton} from "@/Components/Buttons/DropdownFilterButton";
import {motion, Variants} from "framer-motion"
import {ISearchingFormItem} from "@/types/searchingFilters";
import {InputCustom} from "@/Components/Inputs/InputCustom";
import {Control, FieldValues, UseFormRegister} from "react-hook-form";
import {CalendarInput} from "@/Components/Inputs/CalendarInput";
import {useDispatchTyped} from "@/services/hooks/typedUseSelector";
import {updatePage} from "@/services/slices/filters-slice";
import {CheckBoxCustom} from "@/Components/Inputs/CheckBoxCustom";

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

    const dispatch = useDispatchTyped();
    const setCurrentPageToOne = () => dispatch(updatePage(1))

    return (
        <motion.div initial={"closed"} animate={isOpen ? "open" : "closed"} variants={itemVariants} className={`${className} h-fit`}>
            <DropdownFilterButton clickHandler={() => setIsOpen(!isOpen)} className={"mb-2"} isOpen={isOpen} children={name}/>
            <motion.div className={"overflow-hidden"} variants={listVariants}>
                {inputData.sortValues.type === "huge" && (
                    <InputCustom setFirstPage={setCurrentPageToOne} inputData={inputData} control={control} register={register}/>
                )}
                {inputData.sortValues.type === "date" &&
                    <CalendarInput register={register} control={control} inputData={inputData}/>
                }
                {inputData.sortValues.type === "checkBox" && (
                    <CheckBoxCustom inputData={inputData} register={register} setFirstPage={setCurrentPageToOne} />
                )}
            </motion.div>
        </motion.div>
    );
});
