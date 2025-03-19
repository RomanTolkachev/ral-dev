import { FunctionComponent, memo, PropsWithChildren, useContext } from 'react'
import { SVG } from '@/Components/utils/SVG'
import { translateHeaderName } from '@/Components/Table/lib/translateHeaderName'
import { AnimatePresence, motion } from 'motion/react'
import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'

interface IProps {
    className?: string
    key?: number
    clickHandler: () => void
    isOpen: boolean
    hasAlert?: boolean
    checkedCount?: number
    inputName?: string
}

const motionProps = {
    initial: { opacity: 0, left: "50%", top: "100%", transform: 'translateY(0)', scale: 0.1 },
    animate: { opacity: 1, left: 0, top: 0, transform: 'translateY(-50%) translateX(-21%) scale(1.01)' },
    whileHover: {opacity: 1, left: 0, top: 0, transform: "translateY(-50%) translateX(-21%) scale(1.1)", transition: {
        duration: 0.05,
        ease: "easeOut"
    }},
    exit: { opacity: 0 }
}

export const DropdownFilterButton: FunctionComponent<PropsWithChildren<IProps>> = memo(({
    children,
    clickHandler,
    inputName,
    className,
    key,
    isOpen,
    hasAlert,
    checkedCount
}) => {
    const { customResetField } = useContext(CustomSubmitHandlerContext);
    return (
        <div
            key={key}
            onMouseDown={
                clickHandler
            }
                
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
                        <motion.span
                            onMouseDown={(e) => {
                                e.stopPropagation()
                                customResetField(inputName)}
                            } 
                            key={`alert`}
                            className='absolute inline-block bg-error px-1 text-white text-xs rounded-full'
                            {...motionProps}>
                            очистить
                        </motion.span>)}
                    {checkedCount === 0 ? null : (
                        <motion.span
                            onMouseDown={(e) => {
                                e.stopPropagation()
                                customResetField(inputName)}
                            } 
                            key={`counter`}
                            {...motionProps}
                            className='absolute inline-block bg-error py-[1px] pl-1 pr-2 text-white text-xs rounded-full'>
                            очистить{` (${checkedCount})`}
                        </motion.span>)}
                </AnimatePresence>
            }
        </div>
    )
})
