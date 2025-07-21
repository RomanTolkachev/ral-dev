import { FunctionComponent, useContext } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/Table/ui/FiltersWidget/DropdownItem/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { CustomSubmitHandlerContext, ICustomSubmitHandlerContext } from '@/shared/api/AbstractFormProvider'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import createTranslateFn from '@/Components/Table/lib/translate'
import { TranslateContext } from '@/Components/Table/ui/FiltersWidget/FiltersWidget'


interface IProps {
    className?: string
    dictionary?: Record<string, string>
}

const RalSearchingForm: FunctionComponent<IProps> = ({ className, dictionary }) => {

    const handlers = useContext<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext)
    const translateFn = dictionary ? createTranslateFn(dictionary) : null

    if (!handlers) {
        return null
    }

    const { customResetHandler, filtersData } = handlers
    const { isPending, data: filters } = filtersData

    return (
        <form
            className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 pt-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    (filters as ISearchingFormItem[]).map((filterItem, key) => {
                        return (
                            <TranslateContext.Provider value={translateFn} key={`ddi-${key}`}>
                                <DropdownItem inputData={filterItem} />
                            </TranslateContext.Provider>
                        )
                    })
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

export default RalSearchingForm;