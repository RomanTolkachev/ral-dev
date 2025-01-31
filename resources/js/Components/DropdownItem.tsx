
import { FunctionComponent, memo, useEffect, useState } from 'react'
import { DropdownFilterButton } from '@/Components/Buttons/DropdownFilterButton'
import { motion, Variants } from 'framer-motion'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { InputCustom } from '@/Components/Inputs/InputCustom/InputCustom'
import { CalendarInput } from '@/Components/Inputs/CalendarInput/CalendarInput'
import { CheckBoxCustom } from '@/Components/Inputs/CheckBoxCustom'
import { isEqual, keys, values } from 'lodash'
import { useFormContext } from 'react-hook-form'
import useParamsCustom from '@/shared/query/useParamsCustom'



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
    const { watch, control } = useFormContext();
    const inputName = inputData.header;
    const [, getQuery] = useParamsCustom();
    const queries = getQuery()

    // проверка изменилось ли поле в отличие от дефолтного значения
    const [isDitry, setIsDirty] = useState<boolean>(keys(queries).includes(inputName));
    useEffect(() => {
        const { unsubscribe } = watch((value) => { /*почему-то value от сюда не цепляется, нужно его брать через control*/
            if (control._defaultValues && control._defaultValues[inputName]) {
                let defaultValue = control._defaultValues[inputName];
                let currentValue = control._formValues[inputName]
                isEqual(defaultValue, currentValue) ? setIsDirty(false) : setIsDirty(true)
            }
        });
        return () => unsubscribe();
    }, [watch, control._defaultValues, control._formValues])


    return (
        <motion.div
            initial={'closed'}
            animate={isOpen ? 'open' : 'closed'}
            variants={itemVariants}
            className={`${className} h-fit`}>
            <DropdownFilterButton
                clickHandler={() => setIsOpen(!isOpen)}
                className={'mb-2 relative'}
                isOpen={isOpen}
                hasAlert={isDitry}
                children={inputName}
            />
            <motion.div className={'overflow-hidden'} variants={listVariants}>
                {inputData.sortValues.type === 'huge' && <InputCustom inputData={inputData} />}
                {inputData.sortValues.type === 'date' && <CalendarInput inputData={inputData} />}
                {inputData.sortValues.type === 'checkBox' && <CheckBoxCustom inputData={inputData} />}
            </motion.div>
        </motion.div>
    )
})
