import { FC } from "react"
import { Circle } from "./Circle"
import { motion } from "motion/react"
import highlight from "../../../lib/highlightText"
import { getNPStatusColor, getStatusColor } from "../lib"

type Props = {
    npStatus: string
    status: string
    link: string
    value: string | null
    queryValue: string | string[]
}

const motionProperties = {
    style: { scale: 1.01 },
    initial: { scale: 1.01 },
    whileHover: { scale: 1.05 }
};

export const LinkWithCircle: FC<Props> = ({ npStatus = "", status = "", link = "", value = "", queryValue }) => {
    return (
        <span className="flex items-center w-full">
            {status && npStatus ? (
                <>
                    <span className="mx-4 w-fit">
                        <Circle outerColor={getNPStatusColor(npStatus)} innerColor={getStatusColor(status)} />
                    </span>
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
                </>) : <span className="w-full text-center">нет данных</span>
            }
        </span>
    )
}