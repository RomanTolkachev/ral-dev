import { FunctionComponent, useState, useMemo } from 'react'
import { DropdownFilterButton } from '@/Components/Buttons/DropdownFilterButton'
import { motion, Variants } from 'framer-motion'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { CalendarInput } from '@/Components/Inputs/CalendarInput/CalendarInput'
import { CheckBoxCustom } from '@/Components/Inputs/CheckBoxCustom'
import { useFormContext } from 'react-hook-form'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { MultiSelect } from '../../../../Inputs/Multiselect/MultiSelect'
import { SingleText } from '../../../../Inputs/SingleText'
import { MultiSelectVariants } from '@/Components/Inputs/MultiSelectVariants/MultiSelectVariants'

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

export const DropdownItem: FunctionComponent<IProps> = ({ inputData, className }) => {
    const { watch } = useFormContext();
    const inputName = inputData.header;
    const [_, getQuery] = useParamsCustom();
    const queries = getQuery();

    const [isOpen, setIsOpen] = useState(() => {
        const queryValue = queries[inputName];
        return !!queryValue && (Array.isArray(queryValue))
            ? queryValue.some(item => !!item)
            : !!queryValue;
    });

    const fieldValue = watch(inputName);

    const isDirty = useMemo(() => {
        if (fieldValue === undefined || fieldValue === null) return false;

        if (Array.isArray(fieldValue)) {
            return fieldValue.some(item => {
                if (item === undefined || item === null) return false;
                if (typeof item === 'string') return item.trim() !== '';
                return !!item;
            });
        }

        if (typeof fieldValue === 'string') return fieldValue.trim() !== '';

        return !!fieldValue;
    }, [fieldValue]);

    const checkedCount = useMemo(() => {
        return inputData.sortValues.type === 'checkBox'
            ? (Array.isArray(fieldValue) ? fieldValue.length : 0)
            : 0;
    }, [fieldValue, inputData.sortValues.type]);

    const renderInput = () => {
        switch (inputData.sortValues.type) {
            case 'date':
                return <CalendarInput inputData={inputData} />;
            case 'checkBox':
                return <CheckBoxCustom inputData={inputData} />;
            case 'multi':
                return <MultiSelect inputData={inputData} />;
            case 'multiVariants':
                return <MultiSelectVariants inputData={inputData} />;
            case 'singleText':
                return <SingleText inputData={inputData} />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={'closed'}
            animate={isOpen ? 'open' : 'closed'}
            variants={itemVariants}
            className={`${className} h-fit`}
        >
            <DropdownFilterButton
                clickHandler={() => setIsOpen(!isOpen)}
                className={'mb-2 relative'}
                inputName={inputName}
                isOpen={isOpen}
                hasAlert={isDirty}
                children={inputName}
                checkedCount={checkedCount}
            />
            <motion.div className={'overflow-hidden'} variants={listVariants}>
                {renderInput()}
            </motion.div>
        </motion.div>
    );
};