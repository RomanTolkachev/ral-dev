import { FunctionComponent, PropsWithChildren } from 'react'
import { SVG } from '@/Components/utils/SVG'
import { getHeaderName } from '@/shared/getHeaderName.ts'
import { AnimatePresence, motion } from 'motion/react'

interface IProps {
    className?: string
    key?: number
    clickHandler: () => void
    isOpen: boolean
    hasAlert?: boolean
}

export const DropdownFilterButton: FunctionComponent<PropsWithChildren<IProps>> = ({
    children,
    clickHandler,
    className,
    key,
    isOpen,
    hasAlert
}) => {
const getRandom = () => {
    Math.floor(Math.random() * (30 - 10 + 1)) + 10
    console.log(Math.floor(Math.random() * (30 - 10 + 1)) + 10)
}

    return (
        <div
            key={key}
            onMouseDown={clickHandler}
            className={`${className} ${isOpen ? 'bg-filter-dropdown-button-active' : 'bg-filter-dropdown-button'}
                font-medium text-header-text transition-all 
                shadow-md select-none justify-center items-center
                flex rounded-2xl pl-5 py-3 relative pr-[3.5rem]
                text-center border border-filter-dropdown-button-border`}>
            <span>{getHeaderName(children)}</span>
            <span
                className={`${isOpen ? '-rotate-180' : '-rotate-90'} transition-all duration-200 w-6
                    absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1`}>
                <SVG className={'text-gray-common'} arrow />
            </span>
            {
                <AnimatePresence>
                    {hasAlert && 
                        <motion.span 
                            className={"absolute text-[#775da6] w-8 top-0 -translate-y-1/2 left-0 -translate-x-1/2"}
                            key={key}
                            initial={{opacity: 0, x: 15, y: 15, scale: 0}}
                            animate={{opacity: 1, x: "-50%", y: "-50%", scale: 1}}
                            exit={{opacity: 0}}
                        >
                            <SVG alert />
                        </motion.span>}
                </AnimatePresence>
            }
        </div>
    )
}
