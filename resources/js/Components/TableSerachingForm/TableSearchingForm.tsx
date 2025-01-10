import { FunctionComponent, useEffect } from 'react'
import { Preloader } from '@/Components/utils/Preloader'
import { DropdownItem } from '@/Components/DropdownItem'
import { MainButton } from '@/Components/Buttons/MainButton'
import { useFormContext } from 'react-hook-form'
import { useDispatchTyped as useDispatch, useSelectorTyped as useSelector } from '@/services/hooks/typedUseSelector'
import { updateForm, updateHookFormQueries } from '@/services/slices/filters-slice'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'
import { filterQueries } from '@/shared/filterQueries'
import sortObject from '@/shared/sortObject'
import excludePaginationQueries from '@/shared/excludePaginationQueries'


interface IProps {
    className?: string
}

export const TableSearchingForm: FunctionComponent<IProps> = ({ className }) => {
    const { data: filters, isPending } = useRalFilters()
    const dispatch = useDispatch()
    const formQueries = useSelector(state => state.filtersReducer.currentHookFormQueries)
    const submittedQueries = useSelector(state => state.filtersReducer.queries)
    const { handleSubmit, reset, setValue, watch } = useFormContext();
    const values = watch();

    // в этой функции логока, нужно ли сбрасывать текущую страницу, если мы что-то поменяли в форме
    function submitHandler(formQueries: any, submittedQueries: any) {
        const submittedQueriesSorted = JSON.stringify(sortObject(excludePaginationQueries(filterQueries(submittedQueries))))
        const formQueriesSorted = JSON.stringify(sortObject(excludePaginationQueries(filterQueries(formQueries))))

        if (submittedQueriesSorted === formQueriesSorted) {
            return { ...submittedQueries, page: +formQueries.page, perPage: +formQueries.perPage }
        } else {
            setValue("page", 1)
            return { ...formQueries, page: 1, perPage: +formQueries.perPage }
        }
    }

    // отправляем в редакс форму целиком, если она изменилась в сравнении с редаксом
    useEffect(() => {
        const sortedValues = JSON.stringify(sortObject(filterQueries((values))))
        const sortedQueries = JSON.stringify(sortObject(filterQueries((formQueries))))

        if (sortedValues !== sortedQueries || values.page !== formQueries.page) {
            dispatch(updateHookFormQueries(filterQueries(values)))
        }
    }, [values, formQueries, dispatch])

    return (
        <form onSubmit={handleSubmit(() => dispatch(updateForm(submitHandler(formQueries, submittedQueries))))} className={`${className} flex-col overflow-hidden flex`}>
            <div className={'px-6 w-full grow shrink overflow-y-scroll space-y-4'}>
                {isPending ? (
                    <Preloader widthStyles={'w-16'} />
                ) : (
                    filters?.map((filterItem, key) => {
                        return <DropdownItem inputData={filterItem} key={key} /> //FIXME: TS
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
