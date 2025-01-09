import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { useFormContext } from 'react-hook-form'
import { useDispatchTyped as useDispatch, useSelectorTyped as useSelector } from '@/services/hooks/typedUseSelector'
import { updateForm, updatePage } from '@/services/slices/filters-slice'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'
import { json } from 'stream/consumers'

interface IProps {
    className?: string
}

export const TableSearchingForm: FunctionComponent<IProps> = ({ className }) => {
    const { data: filters, isPending } = useRalFilters()
    const dispatch = useDispatch()
    const { data } = useRalFilters()

    const { handleSubmit, reset, formState } = useFormContext();

    const submitHandler = (data: any) => {
        if (Object.keys(formState.dirtyFields).length === 1 && Object.keys(formState.dirtyFields)[0] === 'page') {
            dispatch(updatePage(data.page))
        } else {
            dispatch(updateForm(data))
        }
        console.log(formState)
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    filters?.map((filterItem, key) => {
                        return <DropdownItem className={''} inputData={filterItem} key={key} />
                    })
                )}
            </div>
            <div className={'sticky bottom-0 bg-background-block flex flex-col bg-background py-6 space-y-4 gap-2'}>
                <MainButton color={'violet'} className={'mx-auto'}>
                    Применить
                </MainButton>
                <button onClick={() => reset()}>сбросить</button>
            </div>
        </form>
    )
}
