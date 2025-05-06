import { FunctionComponent, useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { isEqual } from 'lodash'
import { AnimatePresence, motion } from 'motion/react'
import { enterExitAnimation as animationParams } from '@/shared/framer-motion/enter-exit-animation'
import { SVG } from '@/Components/utils/SVG'
import { MainButton } from '@/Components/Buttons/MainButton'
import openCalendarPicker from './lib/openCalendarPicker'
import dateRangeValidation from './lib/dateRangeValidation'
import { CustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider'

interface IProps {
    className?: string
    inputData: ISearchingFormItem
}

export const CalendarInput: FunctionComponent<IProps> = ({ className, inputData }) => {
    const { control, getValues, formState } = useFormContext()
    const handlers = useContext(CustomSubmitHandlerContext)

    if (!handlers) return null

    const { customSubmitHandler } = handlers
    const inputName = inputData.header
    const defaultValue = formState!.defaultValues![inputName];

    return (
        <Controller
            name={inputName}
            control={control}
            rules={{ validate: dateRangeValidation }}
            render={({ field: { value = ["", ""], onChange }, fieldState: { error } }) => {


                return (
                    <div className={`${className} p-1 space-y-2 text-input-text`}>
                        <div className="custom-date w-full flex items-center gap-4">
                            <div className="relative gap-4 flex items-center">
                            <span className="select-none">от</span>
                                <input
                                    type="date"
                                    value={value[0]}
                                    onChange={(e) => onChange([e.target.value, value[1]])}
                                    className={`
                                        pr-10 pl-4 py-2
                                        ${error ? 'ring-2 ring-error border-transparent' : ''}
                                        bg-input-primary text-input-text appearance-none rounded-full shadow-input-search border-black/10
                                        ring-transparent focus:ring-2 focus:ring-button-violet`}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                    <SVG clickHandler={openCalendarPicker} schedule className="w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        <div className="custom-date w-full flex items-center gap-4">
                            <div className="relative gap-4 flex items-center">
                            <span className="select-none">от</span>
                                <input
                                    type="date"
                                    value={value[1]}
                                    onChange={(e) => onChange([e.target.value, value[1]])}
                                    className={`
                                        pr-10 pl-4 py-2
                                        ${error ? 'ring-2 ring-error border-transparent' : ''}
                                        bg-input-primary text-input-text appearance-none rounded-full shadow-input-search border-black/10
                                        ring-transparent focus:ring-2 focus:ring-button-violet`}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                    <SVG clickHandler={openCalendarPicker} schedule className="w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error?.message && (
                                <motion.div {...animationParams} className="text-error text-center">
                                    {error.message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <MainButton
                            onClick={(e: any) => {
                                e.preventDefault()
                                customSubmitHandler(getValues())
                            }}
                            isDisabled={isEqual(value, defaultValue)}
                            color="violet"
                            className={`w-full mx-auto ${isEqual(value, defaultValue) ? 'bg-gray-300' : ''
                                }`}
                        >
                            Применить
                        </MainButton>
                    </div>
                )
            }}
        />
    )
}
