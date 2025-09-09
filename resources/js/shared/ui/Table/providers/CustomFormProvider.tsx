import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { createContext, FunctionComponent, PropsWithChildren, useEffect, useMemo, useRef } from 'react'
import useParamsCustom from '@/shared/query/useParamsCustom'
import { isEmpty } from 'lodash'
import { CustomisationContext, ICustomSubmitHandlerContext } from '../model'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { filterEmptyValues } from './lib'

interface IFormValues {
    [key: string]: any
}

interface IProps {
    config: IConfig<string>
    filters: ISearchingFormItem[]
}

interface QueryParams extends Record<string | "page" | "perPage", number | string | string[] | undefined> { }

export const CustomSubmitHandlerContext = createContext<ICustomSubmitHandlerContext>(undefined);

export const CustomCellContext = createContext<null | CustomisationContext>(null)

export const CustomFormProvider: FunctionComponent<PropsWithChildren<IProps>> = ({
    config,
    children,
    filters
}) => {

    const [setQuery, getQuery] = useParamsCustom();
    const queries = getQuery();
    const debounceTimeoutRef = useRef<number | null>(null);

    const default_filters: Record<string, string | number | string[]> = filters.reduce((acc, item) => ({ ...acc, [item.headerLabel]: item.defaultValue }), { page: 1, perPage: 25, order: "" });

    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(queries)]);

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        mode: "onChange",
        reValidateMode: 'onChange',
        defaultValues: { ...default_filters, ...filters, },
    })
    const { getValues, formState: { dirtyFields, defaultValues }, reset, trigger, setValue } = methods;

    /**
    * Обработчик сабмита формы. Смотрит в dirtyFields и в зависимости от того, что именно изменилось, применяет логику.
    * @param formData Текущее состояние формы
    * @debounceTime number время задержки перед отправкой (ms)
    * @returns Promise<void>. Записывает query параметры в строку поиска
    */
    const customSubmitHandler = async (formData: IFormValues, debounceTime?: number): Promise<void> => {

        formData = filterEmptyValues(formData)

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }

        const submitFunction = async () => {
            const isValid = await trigger();

            function handler(newQuery: QueryParams) {

                isValid && setQuery(newQuery, shouldReplace);
                return reset(newQuery)
            }

            if (isEmpty(dirtyFields)) {
                // console.log("форма не изменилась")
                return;
            }
            else if (dirtyFields.page) {
                const newQuery = { ...formData, page: formData.page };
                handler(newQuery)
                // console.log("изменилась страница")
            }
            else if (dirtyFields.perPage) {
                const newQuery = { ...formData, page: 1, perPage: formData.perPage };
                handler(newQuery)
                // console.log("изменился perPage")
            }
            else {
                const newQuery = { ...formData, page: 1 };
                handler(newQuery)
                // console.log("Изменилась форма")
            }
        };

        if (debounceTime && debounceTime > 0) {
            debounceTimeoutRef.current = setTimeout(submitFunction, debounceTime) as unknown as number;
        } else {
            submitFunction();
        }
    };

    /**
     * Сброс формы до дефолтного состояния и сабмит дефолтных значений
     */
    async function customResetHandler(): Promise<void> {
        const perPage = await getValues().perPage
        reset({ ...default_filters, perPage });
        setQuery({ ...filterEmptyValues(getValues()) })
    }

    /**
     * Сброс формы до дефолтного состояние и сабмит дефолтных значений
     * @param string fieldName имя инпута в react-hook-form
     */
    function customResetField(fieldName: keyof IFormValues): void {
        // console.log("зашли в resetField", { дефолт: defaultValues, dirtyFields })
        setValue(String(fieldName), default_filters[fieldName], { shouldDirty: true })
        customSubmitHandler({ ...filterEmptyValues(getValues()), [fieldName]: default_filters[fieldName] })
    }

    // задаем дефолтные значения фильтров, когда они пришли с БЭКа, также нужно "встряхнуть" форму через reset, иначе дефолт применится после первого input
    useEffect(() => {
        const updateFormValues = async () => {
            if (!isEmpty(queries)) {
                reset({
                    ...default_filters,
                    ...queries,
                }, {
                    keepDirty: true,
                    keepDefaultValues: false,
                });
                await trigger();
            } else if (!isEmpty(default_filters)) {
                reset(default_filters, {
                    keepDirty: true,
                    keepDefaultValues: false,
                });
                await trigger();
            }
        };

        updateFormValues();

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [JSON.stringify(default_filters,), JSON.stringify(queries)]);

    return (
        <CustomSubmitHandlerContext.Provider value={{ customSubmitHandler, customResetHandler, customResetField, filtersData: filters }}>
            <FormProvider {...methods}>
                <CustomCellContext.Provider value={{ config }}>
                    {children}
                </CustomCellContext.Provider>
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    )
}
