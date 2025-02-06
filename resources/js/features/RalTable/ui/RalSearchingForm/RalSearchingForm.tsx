import { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { useFormContext } from 'react-hook-form'
import { isEqual } from 'lodash'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { useRalFilters } from '../../api/useRalFilters'
import { useSelectorTyped } from '@/features/store/typedUseSelector'
import excludePaginationQueries from '@/shared/query/excludePaginationQueries'
import { filterQueries } from '@/shared/query/filterQueries'
import { CustomSubmitHandlerContext } from '../../api/RalFormProvider'


interface IProps {
    className?: string
}

type IForm = Record<string, any>

const RalSearchingForm: FunctionComponent<IProps> = ({ className }) => {
    const userFilters = useSelectorTyped(state => state.userState.settings)
    const { data: filters, isPending } = useRalFilters(userFilters);
    const { handleSubmit, reset, control, setValue: setFormValue, formState, watch} = useFormContext();
    const { customSubmitHandler, customResetHandler } = useContext(CustomSubmitHandlerContext)

    return (
        <form onChange={
            handleSubmit((data) => customSubmitHandler(data))
        }
            // onSubmit={handleSubmit((data) => submitHandler(data, prevQueries))}
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
                <MainButton isDisabled={!formState.isValid} color={'violet'} className={`w-full ${formState.isValid ? "" : "bg-gray-400"} mx-auto`}>
                    Применить
                </MainButton>
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