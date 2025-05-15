import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo, useRef } from 'react'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty, isEqual, keys, values } from 'lodash'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import excludePaginationQueries from '@/shared/query/excludePaginationQueries'
import { TDefaultPaginationRequest } from '../types/pagination'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchAbstractFilters } from './api'
import { AuthContext } from '@/app/providers/AuthProvider'


interface IFormValues {
    [key: string]: any
}

interface IDefaultRequest extends TDefaultPaginationRequest {
    user_columns: unknown[]
}

interface IProps {
    tableName: string
    defaultRequest: IDefaultRequest
    defaultFilters: Record<string, any>
    user?: any | undefined
    CustomCell?: FunctionComponent<any>
    CustomHeader?: FunctionComponent<any>
    cellWidths?: Record<string, number>
    rowClickFn?: () => void
}

type QueryParams = Record<string, any>

export type ICustomSubmitHandlerContext = {
    filtersData: UseQueryResult<ISearchingFormItem[]>
    customSubmitHandler: (formData: Record<string, unknown>) => void // тут плохо
    customResetHandler: () => void
    customResetField: (fieldName: string) => void
} | undefined

export const CustomSubmitHandlerContext = createContext<ICustomSubmitHandlerContext>(undefined); // TODO: ANY!!

type CustomisationContext = {
    CustomCell?: FunctionComponent<any>
    CustomHeader?: FunctionComponent<any>
    rowClickFn?: () => void
    cellWidths?: IProps["cellWidths"]
}
export const CustomCellContext = createContext<null | CustomisationContext>(null)

export const AbstractFormProvider: FunctionComponent<PropsWithChildren<IProps>> = ({
    tableName,
    children,
    defaultRequest,
    defaultFilters,
    CustomCell,
    CustomHeader,
    rowClickFn,
    cellWidths
}) => {

    const user = useContext(AuthContext)

    const [setQuery, getQuery] = useParamsCustom();
    const queries = getQuery();
    const prevQueries = useRef<QueryParams | null>(null);
    const isUserChecked: boolean = user!.isFetched ? true : false // тут плохо

    const filtersData = useQuery({
        enabled: isUserChecked,
        queryFn: () => fetchAbstractFilters(tableName, { userFilters: keys(defaultFilters) }),
        queryKey: ["filters", tableName, defaultFilters]
    })

    const { data: filters = [], isPending: isFiltersPending, isFetched } = filtersData

    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(queries)]);

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        disabled: !filtersData.isFetched,
        mode: "onChange",
        reValidateMode: 'onChange',
        defaultValues: { ...defaultFilters, ...filters },
    })

    // methods.formState.dirtyFields
    // после получения фильтров записываем их для последующего сравнения
    useEffect(() => {
        prevQueries.current = { ...defaultFilters, ...queries, user_columns: defaultRequest.user_columns }
    }, [isFetched])

    /**
     * Обработчик формы с проверкой сброса страницы на первую, если параметры поиска изменились. В замыкании предыдущее и текущее значение формы,
     * а также query
     * @param formData Текущее состояние формы
     * @returns void. Записывает query параметры в строку поиска
     */
    const customSubmitHandler = async (
        formData: IFormValues,
    ): Promise<void> => {
        const isValid = await methods.trigger();
        console.log("зашли в сабмит", isValid)
        if (isEqual(prevQueries.current, formData)) {
            console.log("одинакова", prevQueries.current, formData)
            return;
        } else if (!isEqual(excludePaginationQueries(prevQueries.current!), excludePaginationQueries(formData))) {
            console.log("зашли 1 else if", isValid, methods.formState.errors)
            console.log({ prev: excludePaginationQueries(prevQueries.current!), new: excludePaginationQueries(formData) })
            methods.setValue('page', 1);
            isValid && setQuery({ ...formData, page: 1 }, shouldReplace); // второй параметр true делает replace истории
            prevQueries.current = { ...formData, page: 1, perPage: formData.perPage };
        } else if (!isEqual(prevQueries.current!.page, formData.page)) {
            console.log("зашли в 2 else if", isValid, formData.page)
            methods.setValue('page', formData.page);
            prevQueries.current = { ...formData, page: formData.page };
            isValid && setQuery({ ...formData, page: formData.page }, shouldReplace)
        } else if (!isEqual(prevQueries.current!.perPage, formData.perPage)) {
            console.log("зашли в 3 else if", isValid)
            methods.setValue('page', 1);
            methods.setValue('perPage', formData.perPage);
            isValid && setQuery({ ...formData, page: 1, perPage: formData.perPage }, shouldReplace)
            prevQueries.current = { ...formData, page: 1, perPage: formData.perPage };
        }
    }

    /**
     * Сброс формы до дефолтного состояния и сабмит дефолтных значений
     */
    async function customResetHandler(): Promise<void> {
        const perPage = await methods.getValues().perPage
        methods.reset();
        methods.setValue('perPage', perPage);
        methods.handleSubmit(data => customSubmitHandler(data))()
    }

    /**
     * Сброс формы до дефолтного состояние и сабмит дефолтных значений
     */
    function customResetField(fieldName: keyof IFormValues): void {
        methods.reset({ ...methods.getValues(), [fieldName]: methods.formState.defaultValues![fieldName] }, { keepDefaultValues: true });
        methods.handleSubmit(data => {
            console.log(data);
            customSubmitHandler(data)
        })()
    }

    // установка значений инпутов при обновлении или переходе по ссылке, если в query что-то есть
    useEffect(() => {
        // фильтры приходят с БЭКа, поэтому они указаны в зависимости и имеется проверка, что они не falsy
        if (!isEmpty(values(filters))) {
            const newQueries = filters!.reduce((acc: Record<string, any>, item: ISearchingFormItem) => {
                acc[item.header] = [];
                return acc;
            }, {});
            // когда фильтры пришли, мы задаем defaultValues через reset, первый аргумент которого будут новые defaultValues
            methods.reset({ ...newQueries, ...defaultRequest }, { keepDefaultValues: false })
            methods.trigger()
        }
        /* Если в URL имеются queries, то после reset заново устанавливаются значения этих полей. 
          В компонентах фильтра происходит сверка defaultValue и currentValue, если они разнятся то
           у кнопки рисуется значек */
        if (!isEmpty(queries)) {
            keys(queries).forEach(query => {
                methods.setValue(query, queries[query])
            })
        }
    }, [isFetched]);

    return (
        <CustomSubmitHandlerContext.Provider value={{ customSubmitHandler, customResetHandler, customResetField, filtersData }}>
            <FormProvider {...methods}>
                <CustomCellContext.Provider value={{CustomCell, CustomHeader, rowClickFn, cellWidths}}>
                    {children}
                </CustomCellContext.Provider>
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    )
}

// const Item=()=>{
//     const [settingFilter,setSettingsFilter];
//     const [settingsTable,setSettingsTable];

//     useEffect(()=>{

//     },[settingFilter,settingsTable])
//     return <>
//     <div>   
//         <Filter onChangeSettings={setSettingsFilter}/>
//         <div>
//             <Table onChangeSettings={setSettingsTable}/><Paginatio onChangeSetting={setSettingsPaggination}/>
//         </div>
//     </div>
//     </>
// }

// const Filter=()=>{
//     const form=useForm();

//     useEffect(()=>{
//         onChagseSetting(form)
//     },[form])

//     return <Form>
//         <Input/>
//         <Input/>
//     </Form>
// }