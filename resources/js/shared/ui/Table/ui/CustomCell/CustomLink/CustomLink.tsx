import highlight from "@/shared/highlightText";
import { motion } from "motion/react";
import { FC } from "react";

type Props = {
    value: string | null
    link?: string
    queryValue?: string | string[]
}

const motionProperties = {
    style: { scale: 1.01 },
    initial: { scale: 1.01 },
    whileHover: { scale: 1.05 }
};

export const CustomLink: FC<Props> = ({ value, link, queryValue }) => {
    return (
        link ? (
            <motion.span className="inline-block text-left" {...motionProperties}>
                <a
                    className="underline text-current"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                >
                    {highlight(value, queryValue)}
                </a>
            </motion.span>
        ) : (
            highlight(value, queryValue)
        )
    )
}