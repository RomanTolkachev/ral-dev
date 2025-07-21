import { ChangeEvent, FunctionComponent, useContext, useEffect } from 'react'
import { ISearchingFormItem } from '@/shared/types/searchingFilters.js'
import { Controller, useFormContext } from 'react-hook-form'
import { SVG } from '@/Components/utils/SVG.tsx'
import { AnimatePresence, motion } from 'motion/react'
import { enterExitAnimation as animationParams } from '@/shared/framer-motion/enter-exit-animation.ts'
import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider.tsx'
import { isEmpty } from 'lodash'

interface IProps {
    className?: string
    inputData: ISearchingFormItem
}

function validation(value: unknown): true | string {
    if (!Array.isArray(value)) return true
    const textValue = value[0] || ''
    return isEmpty(textValue) || textValue.length >= 2 ? true : "минимум 2 символа"
}

export const SingleText: FunctionComponent<IProps> = ({ className, inputData }) => {
    const handlers = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    if (!handlers) return null
    
    const { customSubmitHandler } = handlers
    const inputName = inputData.header
    const { control, trigger, getValues, setValue } = useFormContext()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.trim()
        const newValue = inputValue === "" ? [] : [inputValue]
        
        setValue(inputName, newValue, { shouldDirty: true })
        
        const isValid = await trigger(inputName)
        if (isValid) {
            customSubmitHandler(getValues())
        }
    }

    return (
        <Controller
            name={inputName}
            control={control}
            rules={{ validate: validation }}
            render={({ field: { value }, fieldState: { error } }) => {
                const inputValue = Array.isArray(value) && value.length > 0 ? value[0] : ''
                
                return (
                    <div className={`${className} p-1 relative`}>
                        <input
                            type="text"
                            id={inputName}
                            value={inputValue}
                            placeholder={''}
                            onChange={handleChange}
                            className={`
                                ${error && 'ring-2 !ring-error border-transparent '}
                                ring-transparent
                                appearance-none placeholder-transparent
                                focus:ring-2 focus:ring-button-violet
                                rounded-full w-full shadow-input-search border-black/10
                                peer bg-input-primary text-input-text
                                autofill:bg-red-200 focus:autofill:bg-red-200`}
                        />
                        <label
                            htmlFor={inputName}
                            className={`
                                flex justify-center items-center w-full
                                cursor-text select-none transition-all -z-[1]
                                absolute top-0 translate-y-1/2 left-0
                                peer-focus:-z-[1] peer-placeholder-shown:z-[1] text-input-text`}
                        >
                            <SVG magnifyingGlass className={'absolute translate-x-full left-0 w-4 h-4'} />
                            <span className={'first-letter:capitalize'}>поиск</span>
                        </label>
                        <AnimatePresence>
                            {error?.message && (
                                <motion.div
                                    {...animationParams}
                                    className='text-error text-center'
                                >
                                    {error.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            }}
        />
    )
}