import { createContext, FunctionComponent, useContext } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { CustomCellContext, CustomSubmitHandlerContext } from '@/shared/ui/Table/providers/AbstractFormProvider'
import createTranslateFn from '../../lib/translate'
import { DropdownItem } from './DropdownItem'
import { MainButton } from '../../../Buttons/MainButton'
import { CustomisationContext, ICustomSubmitHandlerContext } from '../../model'

export const TranslateContext = createContext<ReturnType<typeof createTranslateFn> | null>(null);

export const FiltersWidget: FunctionComponent = () => {

    const submitContext = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    const customContext = useContext<CustomisationContext | null>(CustomCellContext)
    

    if (!submitContext || !customContext) {
        return null
    }

    const { customResetHandler, filtersData: filters } = submitContext;
    const {DICTIONARY} = customContext.config
    
    const translateFn = DICTIONARY ? createTranslateFn(DICTIONARY) : null

    return (
        <form
            className={`flex-col overflow-hidden flex w-full`}>
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