import { motion } from "motion/react";
import { FunctionComponent, PropsWithChildren } from "react";

interface IProps {
    clickHandler: () => void
    isDisabled: boolean
}

const PageNavButton: FunctionComponent<PropsWithChildren<IProps>> = ({ children, clickHandler, isDisabled = false }) => {
    return (
        <motion.button
            className={`${isDisabled ? "bg-input-nav-bg-inactive" : "bg-input-nav-bg-active"}` +  
            ` shadow-nav-page aspect-square rounded-full h-8 transition-colors`}
            disabled={isDisabled}
            onClick={clickHandler}
            style={{ scale: 1.01 }}
            whileHover={!isDisabled
                ? {
                    scale: 1.1,
                    cursor: "pointer",
                    transition: { duration: 0.2 }
                } : {
                    scale: 1.01,
                    cursor: "not-allowed",
                }}
            whileTap={!isDisabled
                ? {
                    scale: 0.99,
                    transition: { duration: 0.05 }
                } : {
                    scale: 1.01,
                }}
        >
            {children}
        </motion.button>
    )
}

export default PageNavButton;