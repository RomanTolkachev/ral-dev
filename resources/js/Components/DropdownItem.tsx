import {FunctionComponent, useState} from 'react';
import {DropdownFilterButton} from "@/Components/Buttons/DropdownFilterButton";
import {motion, Variants} from "framer-motion"

interface IProps {
    className?: string
    name?: string
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

export const DropdownItem: FunctionComponent<IProps> = ({name}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <motion.div initial={"closed"} animate={isOpen ? "open" : "closed"} variants={itemVariants} onMouseDown={() => setIsOpen(!isOpen)} className={"h-fit"}>
            <DropdownFilterButton isOpen={isOpen} children={name}/>
            <motion.div className={"overflow-hidden"} variants={listVariants}>
                <div>первый</div>
                <div>второй</div>
                <div>третий</div>
            </motion.div>
        </motion.div>
    );
};
