import { createContext, FunctionComponent, useContext } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { CustomCellContext, CustomSubmitHandlerContext } from '@/shared/ui/Table/providers/CustomFormProvider'
import createTranslateFn from '../../lib/translate'
import { DropdownItem } from './DropdownItem'
import { MainButton } from '../../../Buttons/MainButton'
import { CustomisationContext, ICustomSubmitHandlerContext } from '../../model'
import { motion } from 'motion/react'
import { enterExitAnimation } from '@/shared/framer-motion/enter-exit-animation'
import { getErrorMessage } from '../../lib'

export const TranslateContext = createContext<ReturnType<typeof createTranslateFn> | null>(null);

type Props = {
    isFetching?: boolean
    failureCount?: number
}

export const FiltersWidget: FunctionComponent<Props> = ({ isFetching, failureCount = 0 }) => {

    const submitContext = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    const customContext = useContext<CustomisationContext | null>(CustomCellContext)


    if (!submitContext || !customContext) {
        return null
    }

    const { customResetHandler, filtersData: filters } = submitContext;
    const { DICTIONARY } = customContext.config

    const translateFn = DICTIONARY ? createTranslateFn(DICTIONARY) : null

    return (
        <form
            className={`flex-col overflow-hidden flex w-full relative`}>
            {isFetching && (
                <motion.div
                    {...enterExitAnimation}
                    className="absolute inset-0 bg-background-block/70 z-10 flex justify-center items-center rounded-xl"
                >
                    <div className="flex flex-col items-center">
                        <Preloader widthStyles='w-10' />
                        <span className="mt-3 text-table-base">{getErrorMessage(failureCount)}</span>
                    </div>
                </motion.div>
            )}
            <div className={'px-6 pt-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {!filters ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    !filters.length
                        ? <div className='text-center'>Фильтры отсутствуют</div>
                        : (filters.map((filterItem, key) => {
                            return (
                                <TranslateContext.Provider value={translateFn} key={`ddi-${key}`}>
                                    <DropdownItem inputData={filterItem} />
                                </TranslateContext.Provider>
                            )
                        }))
                )}
            </div>
            <div className={`sticky w-fit bottom-0 bg-background-block flex flex-col py-6 space-y-4 gap-2 mx-auto`}>
                <MainButton
                    className={`w-full`}
                    onClick={customResetHandler}
                    color={'white'}
                    type='reset'>Сбросить фильтры
                </MainButton>
            </div >
        </form >
    );
}