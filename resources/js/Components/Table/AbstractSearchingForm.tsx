import { FunctionComponent, memo, useContext } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/Inputs/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { useSelectorTyped } from '@/features/store/typedUseSelector'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'


interface IProps {
    className?: string
}

const AbstractSearchingForm: FunctionComponent<IProps> = memo(({ className }) => {
    const isPending = false;
    const filters: ISearchingFormItem[] = [
        {
            header: "test",
            headerType: 'bla',
            sortValues: {
                type: 'huge',
                checkboxValues: [1, 2, 3],
                min: "0",
                max: "5",
            }
        },
        {
            header: "test2",
            headerType: 'bla',
            sortValues: {
                type: 'huge',
                checkboxValues: [1, 2, 3],
                min: "0",
                max: "5",
            }
        }
    ]

    return (
        <form
            className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 pt-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    filters?.map((filterItem, key) => {
                        return <DropdownItem inputData={filterItem} key={`ddi-${key}`} />
                    })
                )}
            </div>
            <div className={`sticky w-fit bottom-0 bg-background-block flex flex-col py-6 space-y-4 gap-2 mx-auto`}>
                <MainButton
                    className={`w-full`}
                    onClick={() => console.log("сброс фильтров")}
                    color={'white'}
                    type='reset'>Сбросить фильтры
                </MainButton>
            </div >
        </form >
    );
})

export default AbstractSearchingForm;