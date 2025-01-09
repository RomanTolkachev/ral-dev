import React, { FunctionComponent, useCallback } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { useFormContext } from 'react-hook-form'
import { useDispatchTyped as useDispatch, useSelectorTyped as useSelector } from '@/services/hooks/typedUseSelector'
import { updateForm } from '@/services/slices/filters-slice'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'

interface IProps {
    className?: string
}

export const TableSearchingForm: FunctionComponent<IProps> = ({ className }) => {
    const { data, isPending } = useRalFilters()
    const dispatch = useDispatch()

    const { handleSubmit, control, reset } = useFormContext()

    const submitHandler = useCallback(
        (data: any) => {
            dispatch(updateForm(data))
            console.log(data)
        },
        [dispatch],
    )

    function resetHandler() {
        reset()
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    data.map((filterItem, key) => {
                        return <DropdownItem className={''} inputData={filterItem} key={key} />
                    })
                )}
            </div>
            <div className={'sticky bottom-0 bg-background-block flex flex-col bg-background py-6 space-y-4 gap-2'}>
                <MainButton color={'violet'} className={'mx-auto'}>
                    Применить
                </MainButton>
                <button onClick={resetHandler}>сбросить</button>
            </div>
        </form>
    )
}
