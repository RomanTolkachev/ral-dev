import { ChangeEvent, FunctionComponent, useContext } from 'react'
import { ISearchingFormItem } from '@/shared/types/searchingFilters.js'
import { Control, Controller, useFormContext } from 'react-hook-form'
import { SVG } from '@/Components/utils/SVG.tsx'
import splitValue from './lib/splitValue.ts'
import joinValue from './lib/joinValue.ts'
import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider.tsx'
import { AnimatePresence, motion } from 'motion/react'
import { enterExitAnimation as animationParams } from '@/shared/framer-motion/enter-exit-animation.ts'
import customValidation from './lib/customValidation.ts'

interface IProps {
    className?: string
    inputData: ISearchingFormItem
    control?: Control
    setFirstPage?: any
}

/**
 * Значения передаваемые из данного input разбиваются в массив для отправки на БЭК, поэтому в handler значение обернуто в
 * функцию splitValue. Функция joinValue нужна для того, чтобы при обновлении страницы, корректно собрать значение из
 * query параметров обратно в input
 */
export const InputCustom: FunctionComponent<IProps> = ({ className, inputData }) => {
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext);
    const inputName = inputData.header
    const { control, trigger, getValues } = useFormContext();

    /**
     * Функция обновляет состояние react-hook-form, 
     * затем проверяет обновленное поле на валидность
     * и если оно валидно, то происходит submit
     * @param e событие onChange
     * @param updater функция, которая записывает значение в состояние react-hook-form
     */
    const handleChange = async (e: ChangeEvent<HTMLInputElement>, updater: (...args: any[]) => void,) => {
        updater(splitValue(e.target.value));
        let isValid = await trigger();
        isValid && customSubmitHandler(getValues())
    }

    return (
        <Controller
            name={inputName}
            control={control}
            rules={{ validate: customValidation }}
            render={({ field: { onChange: updateForm, value }, fieldState: { error } }) => (
                <div className={`${className} p-1 relative`}>
                    <input
                        type="text"
                        id={inputName}
                        value={joinValue(value) || ''}
                        placeholder={''}
                        onChange={e => handleChange(e, updateForm)}
                        className={`
                            ${error && 'ring-2 !ring-error border-transparent '}
                            ring-transparent
                            appearance-none placeholder-transparent
                            focus:ring-2 focus:ring-button-violet
                            rounded-full w-full shadow-input-search  border-black/10
                            peer bg-input-primary text-input-text
                            autofill:bg-red-200 focus:autofill:bg-red-200`}></input>
                    <label
                        htmlFor={inputName}
                        className={`
                            flex justify-center items-center w-full
                            cursor-text select-none transition-all -z-[1]
                            absolute top-0 translate-y-1/2 left-0
                            peer-focus:-z-[1] peer-placeholder-shown:z-[1] text-input-text `}>
                        <SVG magnifyingGlass className={'absolute translate-x-full left-0 w-4 h-4'} />
                        <span className={'first-letter:capitalize'}>поиск</span>
                    </label>
                    <AnimatePresence>
                        {error && error.message &&
                            <motion.div
                                {...animationParams}
                                className='text-error text-center'>
                                {error.message}
                            </motion.div>}
                    </AnimatePresence>
                </div>
            )}></Controller>
    )
}
