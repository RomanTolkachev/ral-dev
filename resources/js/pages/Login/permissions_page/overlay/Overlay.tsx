import { Preloader } from "@/Components/utils/Preloader";
import { motion } from "motion/react";
import { FC } from "react";

type Props = {
    className: string
}

export const Overlay: FC<Props> = ({ className }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${className} inset-0 bg-blue-950/50  my-block z-20`}>
            <Preloader widthStyles="size-16" />
        </motion.div>
    )
}