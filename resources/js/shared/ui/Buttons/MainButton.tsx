import { motion } from 'motion/react';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

type ButtonColor = "violet" | "red" | "white";


interface IProps {
    className?: string
    onClick?: any
    color: ButtonColor
    isDisabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
}

export const MainButton: FunctionComponent<PropsWithChildren<IProps>> = ({ className, children, onClick, color, isDisabled, type }) => {
    const currentColor = useMemo(() => {
        switch (color) {
            case "red": {
                return "red-btn"
            }
            case "violet": {
                return "violet-btn"
            }
            case "white": {
                return "white-btn"
            }
            default: return "white-btn"
        }
    }, [])
    return (
        <motion.button
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            className={`${className} ${currentColor} ${isDisabled ? "bg-gray-400" : ""} transition-colors text-sm rounded-xl shadow-button-main font-bold py-3 px-7 w-fit select-none`}
            style={{ boxShadow: '0px 5px 4px 0px rgba(0, 0, 0, 0.3)', scale: 1.01 }}
            whileHover={!isDisabled 
            ? {
                scale: 1.03,
                boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.2)",
                cursor: "pointer"
            } : {
                scale: 1.01,
                cursor: "not-allowed"
            }}
            whileTap={!isDisabled 
            ?    {
                scale: 0.99,
                boxShadow: "0px 5px 4px 0px rgba(0, 0, 0, 0.4)",
                transition: { duration: 0.02 }
            } : {
                scale: 1.01,
            }}
            transition={{
                scale: { duration: 0.1, stiffness: 200 },
                boxShadow: { ease: "easeOut", duration: 0.1 }
            }}
        >
            {children}
        </motion.button>
    );
};
