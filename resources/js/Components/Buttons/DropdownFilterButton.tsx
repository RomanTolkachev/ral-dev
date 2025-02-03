import { FunctionComponent, PropsWithChildren } from 'react'
import { SVG } from '@/Components/utils/SVG'
import { translateHeaderName } from '@/Components/Table/features/translateHeaderName'
import { AnimatePresence, motion } from 'motion/react'

interface IProps {
    className?: string
    key?: number
    clickHandler: () => void
    isOpen: boolean
    hasAlert?: boolean
    checkedCount?: number
}

const motionVariants = {
    initial: {opacity: 0, left: "50%", top: "100%", transform: 'translateY(0)', scale: 0},
    animate: {opacity: 1, left: 0, top: 0, transform: 'translateY(-50%) translateX(-40%)', scale: 1},
    exit: {opacity: 0}
}

export const DropdownFilterButton: FunctionComponent<PropsWithChildren<IProps>> = ({
    children,
    clickHandler,
    className,
    key,
    isOpen,
    hasAlert,
    checkedCount
}) => {

    return (
        <div
            key={key}
            onMouseDown={clickHandler}
            className={`${className} ${isOpen ? 'bg-filter-dropdown-button-active' : 'bg-filter-dropdown-button'}
                font-medium text-header-text transition-all h-fit
                shadow-md select-none justify-center items-center
                flex rounded-2xl py-3 relative pl-4 pr-[3.5rem]
                text-center border border-filter-dropdown-button-border `}>
                
            <span>{translateHeaderName(children)}</span>
            <span
                className={`${isOpen ? '-rotate-180' : '-rotate-90'} transition-all duration-200 w-6
                    absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1`}>
                <SVG className={'text-gray-common'} arrow />
            </span>
            {
                <AnimatePresence>
                    {hasAlert && checkedCount === 0 && (
                        <motion.span className='absolute w-6 bg-[#775da6] text-white rounded-full' key={`counter`} {...motionVariants}>
                            !
                        </motion.span>)}
                    {checkedCount === 0 ? null : (
                        <motion.span className='absolute w-6 bg-[#775da6] text-white rounded-full pr-[1px]' key={`counter`} {...motionVariants}>
                            {checkedCount}
                        </motion.span>)}
                </AnimatePresence>
            }
        </div>
    )
}
