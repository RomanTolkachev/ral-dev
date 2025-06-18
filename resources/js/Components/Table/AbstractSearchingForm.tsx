import { createContext, FunctionComponent, useContext } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/Inputs/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider'
import createTranslateFn from './lib/translate'

export const TranslateContext = createContext<ReturnType<typeof createTranslateFn> | null>(null);

interface IProps {
    className?: string
    filters?: ISearchingFormItem[]
    dictionary?: Record<string, string>
}

const AbstractSearchingForm: FunctionComponent<IProps> = ({ className, filters, dictionary }) => {

    const submitContext = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    const translateFn = dictionary ? createTranslateFn(dictionary) : null

    if (!submitContext) {
        return null
    }

    const { customResetHandler } = submitContext;

    return (
        <form
            className={`${className} flex-col overflow-hidden flex`}>
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

export default AbstractSearchingForm;