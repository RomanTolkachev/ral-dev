import React, { FunctionComponent, memo, useState } from 'react'
import { DropdownFilterButton } from '@/Components/Buttons/DropdownFilterButton'
import { motion, Variants } from 'framer-motion'
import { ISearchingFormItem } from '@/types/searchingFilters'
import { InputCustom } from '@/Components/Inputs/InputCustom/InputCustom'
import { CalendarInput } from '@/Components/Inputs/CalendarInput/CalendarInput'
import { useDispatchTyped } from '@/services/hooks/typedUseSelector'
import { updatePage } from '@/services/slices/filters-slice'
import { CheckBoxCustom } from '@/Components/Inputs/CheckBoxCustom'

interface IProps {
    className?: string
    formName?: string
    inputData: ISearchingFormItem
}

const listVariants: Variants = {
    open: {
        height: 'fit-content',
        transition: {
            type: 'spring',
            ease: 'easeInOut',
            duration: 0.25,
        },
    },
    closed: {
        height: 0,
        transition: {
            duration: 0.15,
        },
    },
}

const itemVariants: Variants = {
    closed: {},
    open: {},
}

export const DropdownItem: FunctionComponent<IProps> = memo(({ inputData, className }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dispatch = useDispatchTyped();
    const setCurrentPageToOne = () => dispatch(updatePage(1));

    return (
        <motion.div
            initial={'closed'}
            animate={isOpen ? 'open' : 'closed'}
            variants={itemVariants}
            className={`${className} h-fit`}>
            <DropdownFilterButton
                clickHandler={() => setIsOpen(!isOpen)}
                className={'mb-2'}
                isOpen={isOpen}
                children={inputData.header}
            />
            <motion.div className={'overflow-hidden'} variants={listVariants}>
                {inputData.sortValues.type === 'huge' && (
                    <InputCustom setFirstPage={setCurrentPageToOne} inputData={inputData} />
                )}
                {inputData.sortValues.type === 'date' && <CalendarInput inputData={inputData} />}
                {inputData.sortValues.type === 'checkBox' && (
                    <CheckBoxCustom inputData={inputData} setFirstPage={setCurrentPageToOne} />
                )}
            </motion.div>
        </motion.div>
    )
})
