<<<<<<< HEAD
import { FunctionComponent, memo, useEffect, useState } from 'react'
=======
import React, { FunctionComponent, memo, useEffect, useState } from 'react'
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
import { DropdownFilterButton } from '@/Components/Buttons/DropdownFilterButton'
import { motion, Variants } from 'framer-motion'
import { ISearchingFormItem } from '@/types/searchingFilters'
import { InputCustom } from '@/Components/Inputs/InputCustom/InputCustom'
import { CalendarInput } from '@/Components/Inputs/CalendarInput/CalendarInput'
<<<<<<< HEAD
import { CheckBoxCustom } from '@/Components/Inputs/CheckBoxCustom'
import { isEqual, keys, values } from 'lodash'
import { useFormContext } from 'react-hook-form'
import useParamsCustom from '@/services/hooks/useParamsCustom'
=======
import { useDispatchTyped } from '@/services/hooks/typedUseSelector'
import { updatePage } from '@/services/slices/filters-slice'
import { CheckBoxCustom } from '@/Components/Inputs/CheckBoxCustom'
import { isEqual } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { SVG } from './utils/SVG'
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

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
<<<<<<< HEAD
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
=======
    const {watch, formState, control} = useFormContext();
    const inputName = inputData.header;

    // проверка изменилось ли поле в отличие от дефолтного значения
    const [isDitry, setIsDirty] = useState<boolean>(false);
    useEffect(() => {
        const { unsubscribe } = watch((value) => {
            if (control._defaultValues && control._defaultValues[inputName]) {
                let defaultValue = control._defaultValues[inputName];
                let currentValue = value[inputName]
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
                isEqual(defaultValue, currentValue) ? setIsDirty(false) : setIsDirty(true)
            }
        });
        return () => unsubscribe();
<<<<<<< HEAD
    }, [watch, control._defaultValues, control._formValues])

=======
    }, [watch, control._defaultValues])
    
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

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
<<<<<<< HEAD
            <motion.div className={'overflow-hidden'} variants={listVariants}>
                {inputData.sortValues.type === 'huge' && <InputCustom inputData={inputData} />}
                {inputData.sortValues.type === 'date' && <CalendarInput inputData={inputData} />}
                {inputData.sortValues.type === 'checkBox' && <CheckBoxCustom inputData={inputData} />}
            </motion.div>
        </motion.div>
    )
})
=======

            <motion.div className={'overflow-hidden'} variants={listVariants}>
                {inputData.sortValues.type === 'huge' && (
                    <InputCustom inputData={inputData} />
                )}
                {inputData.sortValues.type === 'date' && <CalendarInput inputData={inputData} />}
                {inputData.sortValues.type === 'checkBox' && (
                    <CheckBoxCustom inputData={inputData} />
                )}
            </motion.div>
        </motion.div>
    )
})
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
