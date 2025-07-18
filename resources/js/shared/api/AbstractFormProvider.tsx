import { FormProvider, useForm, UseFormReturn, useFormState } from 'react-hook-form'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo } from 'react'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty, keys, values } from 'lodash'
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
    const isUserChecked: boolean = user!.isFetched ? true : false // тут плохо

    const filtersData = useQuery({
        enabled: isUserChecked,
        queryFn: () => fetchAbstractFilters(tableName, { userFilters: keys(DEFAULT_FILTERS) }),
        queryKey: ["filters", tableName, DEFAULT_FILTERS],

    })

    const { data: filters = [], isFetched } = filtersData;

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
    const { getValues, formState: { dirtyFields, defaultValues }, handleSubmit, reset, trigger, setValue } = methods;

    /**
    * Обработчик сабмита формы. Смотрит в dirtyFields и в зависимости от того, что именно изменилось, применяет логику.
    * @param formData Текущее состояние формы
    * @returns void. Записывает query параметры в строку поиска
    */
    const customSubmitHandler = async (formData: IFormValues): Promise<void> => {
        const isValid = await trigger();

        console.log("Form submit", { dirtyFields, formData, дефолт: defaultValues });

        if (isEmpty(dirtyFields)) {
            console.log('Форма не изменилась');
            return;
        }

        // Сохраняем текущие значения перед reset
        const currentValues = getValues();

        const resetHandler = () => {
            reset(currentValues, {
                keepDirty: false,  // Сбрасываем dirty состояние
                keepValues: true,   // Сохраняем текущие значения
                keepDefaultValues: true   // Сохраняем текущие значения
            })
        }

        if (dirtyFields.page) {
            const newQuery = { ...formData, page: formData.page };
            isValid && setQuery(newQuery, shouldReplace);
            console.log('Изменилась страница');
            return resetHandler()
        }
        else if (dirtyFields.perPage) {
            const newQuery = { ...formData, page: 1, perPage: formData.perPage };
            isValid && setQuery(newQuery, shouldReplace);
            console.log('Изменился perPage');
            return resetHandler()
        }
        else {
            const newQuery = { ...formData, page: 1 };
            isValid && setQuery(newQuery, shouldReplace);
            console.log('Изменились другие поля');
            return resetHandler()
        }

    };

    /**
     * Сброс формы до дефолтного состояния и сабмит дефолтных значений
     */
    async function customResetHandler(): Promise<void> {
        const perPage = await getValues().perPage
        reset({}, { keepDefaultValues: true });
        setQuery(getValues())
    }

    /**
     * Сброс формы до дефолтного состояние и сабмит дефолтных значений
     */
    function customResetField(fieldName: keyof IFormValues): void {
        reset({ ...getValues(), [fieldName]: defaultValues![fieldName] }, { keepDefaultValues: true });
        handleSubmit(data => {
            customSubmitHandler(data)
        })()
    }

    /* Если в URL имеются queries, то после reset заново устанавливаются значения этих полей. 
    В компонентах фильтра происходит сверка defaultValue и currentValue, если они разнятся то
    у кнопки рисуется значек */
    useEffect(() => {
        if (!isEmpty(queries)) {
            keys(queries).forEach(query => {
                setValue(query, queries[query])
            })
        }
    }, [])

    // установка значений инпутов при обновлении или переходе по ссылке, если в query что-то есть
    useEffect(() => {
        // фильтры приходят с БЭКа, поэтому они указаны в зависимости и имеется проверка, что они не falsy
        if (!isEmpty(values(filters))) {
            const newQueries = filters!.reduce((acc: Record<string, any>, item: ISearchingFormItem) => {
                acc[item.header] = [];
                return acc;
            }, {});
            // когда фильтры пришли, мы задаем defaultValues через reset, первый аргумент которого будут новые defaultValues
            reset({ ...newQueries, ...DEFAULT_FILTERS }, { keepDefaultValues: false })
            trigger()
        }
    }, [JSON.stringify(filters)]);

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
