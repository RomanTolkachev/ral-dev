import { motion } from "motion/react";

const LoadingDots = () => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 1, 0], 
                transition: {
                    duration: 1.5,
                    repeat: Infinity, 
                    repeatType: "loop", 
                    ease: "easeInOut"
                }
            }}
        >
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </motion.span>
    );
};

export default LoadingDots;