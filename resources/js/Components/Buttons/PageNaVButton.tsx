import { motion } from "motion/react";
import { FunctionComponent, PropsWithChildren } from "react";

interface IProps {
    clickHandler: () => void
    isDisabled: boolean 
}

const PageNavButton: FunctionComponent<PropsWithChildren<IProps>> = ({ children, clickHandler, isDisabled = false }) => {
    return (
        <motion.button
            className={`${isDisabled ? "bg-gray-400/30" : ""} bg-background-block rounded-md h-full p-2 border border-[#6b7280] transition-all` }
            disabled={isDisabled}
            onClick={clickHandler}
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
    )
}

export default PageNavButton;