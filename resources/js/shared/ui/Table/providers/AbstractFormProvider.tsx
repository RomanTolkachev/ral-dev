import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo } from 'react'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { fetchAbstractFilters } from '../../../api/api'
import { AuthContext } from '@/app/providers/AuthProvider'
import { CustomisationContext, ICustomSubmitHandlerContext } from '../model'

interface IFormValues {
    [key: string]: any
}

interface IProps {
    config: IConfig<string>
    tableName: string
    user?: any | undefined
    rowClickFn?: () => void
}

interface QueryParams extends Record<string | "page" | "perPage", number | string | string[] | undefined> { }

export const CustomSubmitHandlerContext = createContext<ICustomSubmitHandlerContext>(undefined);

export const CustomCellContext = createContext<null | CustomisationContext>(null)

export const AbstractFormProvider: FunctionComponent<PropsWithChildren<IProps>> = ({
    config,
    tableName,
    children,
    rowClickFn,
}) => {

    const user = useContext(AuthContext)

    const { CELL_WIDTH, ORDERABLE_CELLS, HIDDEN_COLUMNS } = config;

    const [setQuery, getQuery] = useParamsCustom();
    const queries = getQuery();
    const isUserChecked: boolean = user!.isFetched ? true : false

    const filtersData = useQuery({
        enabled: isUserChecked,
        queryFn: () => fetchAbstractFilters(tableName),
        queryKey: ["filters", tableName],
    })

    const { data: filters = [], isFetched } = filtersData;

    const default_filters: Record<string, string | number | string[]> = filters.reduce((acc, item) => ({ ...acc, [item.headerLabel]: item.defaultValue }), { page: 1, perPage: 25, order: "" });

    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(queries)]);

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        disabled: !filtersData.isFetched,
        mode: "onChange",
        reValidateMode: 'onChange',
        defaultValues: { ...default_filters, ...filters, },
    })
    const { getValues, formState: { dirtyFields, defaultValues }, reset, trigger, setValue } = methods;

    /**
    * Обработчик сабмита формы. Смотрит в dirtyFields и в зависимости от того, что именно изменилось, применяет логику.
    * @param formData Текущее состояние формы
    * @returns void. Записывает query параметры в строку поиска
    */
    const customSubmitHandler = async (formData: IFormValues): Promise<void> => {
        const isValid = await trigger();

        function handler(newQuery: QueryParams) {
            isValid && setQuery(newQuery, shouldReplace);
            return reset(newQuery)
        }

        if (isEmpty(dirtyFields)) {
            console.log("форма не изменилась")
            return;
        }
        else if (dirtyFields.page) {
            const newQuery = { ...formData, page: formData.page };
            handler(newQuery)
            console.log("изменилась страница")
        }
        else if (dirtyFields.perPage) {
            const newQuery = { ...formData, page: 1, perPage: formData.perPage };
            handler(newQuery)
            console.log("изменился perPage")
        }
        else {
            const newQuery = { ...formData, page: 1 };
            handler(newQuery)
            console.log("Изменилась форма")
        }
    };

    /**
     * Сброс формы до дефолтного состояния и сабмит дефолтных значений
     */
    async function customResetHandler(): Promise<void> {
        const perPage = await getValues().perPage
        reset({ ...default_filters, perPage });
        setQuery({ ...getValues() })
    }

    /**
     * Сброс формы до дефолтного состояние и сабмит дефолтных значений
     */
    function customResetField(fieldName: keyof IFormValues): void {
        console.log("зашли в resetField", { дефолт: defaultValues, dirtyFields })
        setValue(String(fieldName), default_filters[fieldName], { shouldDirty: true })
        customSubmitHandler({ ...getValues(), [fieldName]: default_filters[fieldName] })
    }

    useEffect(() => {
        console.log("сработал эффект", { default_filters });

        const updateFormValues = async () => {
            if (!isEmpty(queries)) {
                await reset({
                    ...default_filters,
                    ...queries,
                }, {
                    keepDirty: true,
                    keepDefaultValues: false,
                });

                // Теперь trigger выполнится только после завершения reset
                await trigger();
            } else if (!isEmpty(default_filters)) {
                // Обработка случая, когда queries пустые, но default_filters есть
                await reset(default_filters, {
                    keepDirty: true,
                    keepDefaultValues: false,
                });

                await trigger();
            }
        };

        updateFormValues();
    }, [JSON.stringify(default_filters)]);

    console.log({дефолт: methods.formState.defaultValues})

    return (
        <CustomSubmitHandlerContext.Provider value={{ customSubmitHandler, customResetHandler, customResetField, filtersData }}>
            <FormProvider {...methods}>
                <CustomCellContext.Provider value={{
                    config,
                    orderableCells: ORDERABLE_CELLS,
                    rowClickFn,
                    hiddenColumns: HIDDEN_COLUMNS,
                    cellWidths: CELL_WIDTH
                }}>
                    {children}
                </CustomCellContext.Provider>
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    )
}
