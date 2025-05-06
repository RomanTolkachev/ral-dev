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
    [key: string ]: any
}

interface IDefaultRequest extends TDefaultPaginationRequest {
    columns: unknown[]
}

interface IProps {
    tableName: string
    defaultRequest: IDefaultRequest
    defaultFilters: unknown
    user?: any | undefined
}

type QueryParams = Record<string, any>

export type ICustomSubmitHandlerContext = {
    filtersData: UseQueryResult<ISearchingFormItem[]>
    customSubmitHandler: (formData: Record<string, unknown>) => void // тут плохо
    customResetHandler: () => void
    customResetField: (fieldName: string ) => void
} | undefined

export const CustomSubmitHandlerContext = createContext<ICustomSubmitHandlerContext>(undefined); // TODO: ANY!!

export const AbstractFormProvider: FunctionComponent<PropsWithChildren<IProps>> = ({
    tableName,
    children,
    defaultRequest,
    defaultFilters,
}) => {

    const user = useContext(AuthContext)

    const [setQuery, getQuery] = useParamsCustom();
    const queries = getQuery();
    const prevQueries = useRef<QueryParams | null>(null);
    const isUserChecked: boolean = user!.isFetched ? true : false // тут плохо

    const filtersData = useQuery({
        enabled: isUserChecked,
        queryFn: () => fetchAbstractFilters(tableName, { userFilters: defaultFilters }),
        queryKey: ["filters", tableName, defaultFilters]
    })

    const { data: filters, isPending: isFiltersPending, isFetched } = filtersData

    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(queries)]);

    // Устанавливаем default для полей формы. Везде массив. Т.к поля фильтров запрашиваются асинхронно, установлено несколько проверок, чтобы default всегда были валидны
    const startValues = filters
        ? filters.reduce((acc: Record<string, any>, key) => {
            // Проверка, существует ли ключ в acc перед добавлением, т.к значения некоторых ключей установлены на фронте и их нельзя перезаписывать
            if (!(key.header in acc)) {
                acc[key.header] = [];
            }
            return acc;
        }, defaultRequest)
        : defaultRequest;

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: startValues,
    })

    // после получения фильтров записываем их для последующего сравнения
    useEffect(() => {
        prevQueries.current = { ...startValues, ...getQuery() }
    }, [filters])

    /**
     * Обработчик формы с проверкой сброса страницы на первую, если параметры поиска изменились. В замыкании предыдущее и текущее значение формы,
     * а также query
     * @param formData Текущее состояние формы
     * @returns void. Записывает query параметры в строку поиска
     */
    const customSubmitHandler = (
        formData: IFormValues,
    ): void => {
        if (isEqual(prevQueries.current, formData)) {
            return;
        } else if (!isEqual(excludePaginationQueries(prevQueries.current!), excludePaginationQueries(formData))) {
            methods.setValue('page', 1);
            methods.formState.isValid && setQuery({ ...formData, page: 1 }, shouldReplace); // второй параметр true делает replace истории
            prevQueries.current = { ...formData, page: 1, perPage: formData.perPage };
        } else if (!isEqual(prevQueries.current!.page, formData.page)) {
            methods.setValue('page', formData.page);
            prevQueries.current = { ...formData, page: formData.page };
            methods.formState.isValid && setQuery({ ...formData, page: formData.page }, shouldReplace)
        } else if (!isEqual(prevQueries.current!.perPage, formData.perPage)) {
            methods.setValue('page', 1);
            methods.setValue('perPage', formData.perPage);
            methods.formState.isValid && setQuery({ ...formData, page: 1, perPage: formData.perPage }, shouldReplace)
            prevQueries.current = { ...formData, page: 1, perPage: formData.perPage };
        }
    }

    /**
     * Сброс формы до дефолтного состояния и сабмит дефолтных значений
     */
    function customResetHandler(): void {
        const perPage = methods.getValues().perPage
        methods.reset();
        methods.setValue('perPage', perPage);
        methods.handleSubmit(data => customSubmitHandler(data))()
    }

    /**
     * Сброс формы до дефолтного состояние и сабмит дефолтных значений
     */
    function customResetField(fieldName: keyof IFormValues): void {
        methods.reset({ ...methods.getValues(), [fieldName]: methods.formState.defaultValues![fieldName] }, { keepDefaultValues: true });
        methods.handleSubmit(data => customSubmitHandler(data))()
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
        }
        /* Если в URL имеются queries, то после reset заново устанавливаются значения этих полей. 
          В компонентах фильтра происходит сверка defaultValue и currentValue, если они разнятся то
           у кнопки рисуется значек */
        if (!isEmpty(queries)) {
            keys(queries).forEach(query => {
                methods.setValue(query, queries[query])
            })
        }
       
    }, [isFiltersPending, JSON.stringify(filters)]);

    return (
        <CustomSubmitHandlerContext.Provider value={{ customSubmitHandler, customResetHandler, customResetField, filtersData }}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    )
}
