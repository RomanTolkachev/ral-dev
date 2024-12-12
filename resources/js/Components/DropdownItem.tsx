import {FunctionComponent, useState} from 'react';
import {DropdownFilterButton} from "@/Components/Buttons/DropdownFilterButton";
import {motion, Variants} from "framer-motion"

interface IProps {
    className?: string
    name?: string
    inputData: {
        header: string,
        headerType: string,
        sortValues: {
            type: "huge" | "checkBox" | "date"
            checkboxValues: Array<null | string>
        }
    };
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

export const DropdownItem: FunctionComponent<IProps> = ({name, inputData, className}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <motion.div initial={"closed"} animate={isOpen ? "open" : "closed"} variants={itemVariants} className={`${className} h-fit`}>
            <DropdownFilterButton clickHandler={() => setIsOpen(!isOpen)} className={"mb-2"} isOpen={isOpen} children={name}/>
            <motion.div className={"overflow-hidden"} variants={listVariants}>
                {inputData.sortValues.type === "huge" && (
                    <input type="text" className={"rounded-full w-full"}/>
                )}
                {inputData.sortValues.type === "date" && <span>сделать компонент для дат</span>}
                {inputData.sortValues.type === "checkBox" && (
                    <div className={"flex flex-col pl-3 pr-3 pt-3 max-h-32 overflow-y-auto thumb-secondary space-y-1"}>
                        {inputData.sortValues.checkboxValues.map((item, key) => {
                            return (
                                    <div className={'flex items-center border-b last:border-b-0 py-2 border-gray-200'}>
                                        <label className={'pr-2'} key={key}
                                               htmlFor={item?.toString()}
                                        >
                                                {item ? item?.toString() : "пустые"}
                                        </label>
                                        <input className={'ml-auto checked:text-checkbox-custom border-[2px] rounded focus:ring-transparent'} type="checkbox" name={item?.toString()}/>
                                    </div>
                            )
                        })}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};
