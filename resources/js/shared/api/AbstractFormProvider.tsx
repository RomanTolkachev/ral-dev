import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo } from 'react'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty, keys } from 'lodash'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchAbstractFilters } from './api'
import { AuthContext } from '@/app/providers/AuthProvider'

interface IFormValues {
    [key: string]: any
}

interface IProps {
    config: IConfig<string>
    tableName: string
    user?: any | undefined
    rowClickFn?: () => void
}

export type ICustomSubmitHandlerContext = {
    filtersData: UseQueryResult<ISearchingFormItem[]>
    customSubmitHandler: (formData: Record<string, unknown>) => void
    customResetHandler: () => void
    customResetField: (fieldName: string) => void
} | undefined

export const CustomSubmitHandlerContext = createContext<ICustomSubmitHandlerContext>(undefined); // TODO: ANY!!

type CustomisationContext = {
    OrderableCells: string[]
    HiddenColumns: string[]
    rowClickFn?: () => void
    cellWidths?: Partial<Record<string, number>>
}
export const CustomCellContext = createContext<null | CustomisationContext>(null)

export const AbstractFormProvider: FunctionComponent<PropsWithChildren<IProps>> = ({
    config,
    tableName,
    children,
    rowClickFn,
}) => {

    const user = useContext(AuthContext)

    const { CELL_WIDTH, DEFAULT_FILTERS, ORDERABLE_CELLS, HIDDEN_COLUMNS } = config;

    const [setQuery, getQuery] = useParamsCustom();
    const queries = getQuery();
    const isUserChecked: boolean = user!.isFetched ? true : false

    const filtersData = useQuery({
        enabled: isUserChecked,
        queryFn: () => fetchAbstractFilters(tableName, { userFilters: keys(DEFAULT_FILTERS) }),
        queryKey: ["filters", tableName, DEFAULT_FILTERS],
    })

    const { data: filters = [] } = filtersData;

    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(queries)]);

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        disabled: !filtersData.isFetched,
        mode: "onChange",
        reValidateMode: 'onChange',
        defaultValues: { ...DEFAULT_FILTERS, ...filters, },
    })
    const { getValues, formState: { dirtyFields, defaultValues }, reset, trigger, setValue } = methods;

    /**
    * Обработчик сабмита формы. Смотрит в dirtyFields и в зависимости от того, что именно изменилось, применяет логику.
    * @param formData Текущее состояние формы
    * @returns void. Записывает query параметры в строку поиска
    */
    const customSubmitHandler = async (formData: IFormValues): Promise<void> => {
        const isValid = await trigger();
        console.log("грязные поля в customSubmitHandler", dirtyFields)
        if (isEmpty(dirtyFields)) {
            console.log("не изменилась", { текущая: formData, дефолт: defaultValues })
            return;
        }
        if (dirtyFields.page) {
            console.log("изменилась страничка", { текущая: formData, дефолт: defaultValues })
            const newQuery = { ...formData, page: formData.page };
            isValid && setQuery(newQuery, shouldReplace);
            return reset(newQuery)
        }
        else if (dirtyFields.perPage) {
            console.log("изменился perPage", { текущая: formData, дефолт: defaultValues })
            const newQuery = { ...formData, page: 1, perPage: formData.perPage };
            isValid && setQuery(newQuery, shouldReplace);
            return reset(newQuery)
        }
        else {
            console.log("изменились фильтры", { текущая: formData, дефолт: defaultValues })
            const newQuery = { ...formData, page: 1 };
            isValid && setQuery(newQuery, shouldReplace);
            return reset(newQuery)
        }
    };

    /**
     * Сброс формы до дефолтного состояния и сабмит дефолтных значений
     */
    async function customResetHandler(): Promise<void> {
        const perPage = await getValues().perPage
        reset({ ...DEFAULT_FILTERS, ...perPage });
        setQuery(getValues())
    }

    /**
     * Сброс формы до дефолтного состояние и сабмит дефолтных значений
     */
    function customResetField(fieldName: keyof IFormValues): void {
        console.log("зашли в resetField", { дефолт: defaultValues, dirtyFields })
        setValue(String(fieldName), DEFAULT_FILTERS[fieldName], { shouldDirty: true })
        customSubmitHandler({ ...getValues(), [fieldName]: DEFAULT_FILTERS[fieldName] })
    }

    useEffect(() => {
        if (!isEmpty(queries)) {
            reset({
                ...DEFAULT_FILTERS,
                ...queries, // Применяем значения из URL
            }, {
                keepDirty: true, // Сохраняем текущие "грязные" поля, если они есть
            })
        }
    }, [])

    return (
        <CustomSubmitHandlerContext.Provider value={{ customSubmitHandler, customResetHandler, customResetField, filtersData }}>
            <FormProvider {...methods}>
                <CustomCellContext.Provider value={{
                    OrderableCells: ORDERABLE_CELLS,
                    rowClickFn,
                    HiddenColumns: HIDDEN_COLUMNS,
                    cellWidths: CELL_WIDTH
                }}>
                    {children}
                </CustomCellContext.Provider>
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    )
}
