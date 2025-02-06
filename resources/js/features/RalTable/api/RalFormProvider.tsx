import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { createContext, FunctionComponent, PropsWithChildren, useContext, useEffect, useMemo, useRef } from 'react'
import { useRalFilters } from '@/features/ralTable/api/useRalFilters'
import useParamsCustom from '@/shared/query/useParamsCustom'
import DEFAULT_REQUEST from '../config'
import { isEmpty, isEqual, keys, values } from 'lodash'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { useSelectorTyped } from '@/features/store/typedUseSelector'
import excludePaginationQueries from '@/shared/query/excludePaginationQueries'

interface IFormValues {
    [key: string]: any
}

type QueryParams = Record<string, any>

export const CustomSubmitHandlerContext = createContext<any>(null); // TODO: ANY!!


export const RalFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [setQuery, getQuery] = useParamsCustom();
    const userFilters = useSelectorTyped(state => state.userState.settings)
    const { data: filters, isPending } = useRalFilters(userFilters);
    const queries = getQuery();
    const prevQueries = useRef<QueryParams | null>(null);

    // от данной переменной зависит, нужно ли перезаписывать состояния URL. Если query пустые на момент вызова onSubmit, то в историю добавится шаг.
    const shouldReplace = useMemo<boolean>(() => {
        return Object.keys(getQuery()).length ? true : false
    }, [JSON.stringify(getQuery())]);

    /** Устанавливаем default для полей формы. Везде массив. Т.к поля фильтров запрашиваются асинхронно,
    * установлено несколько проверок, чтобы default всегда были валидны  
    */
    const startValues = filters //TODO: выдергивать perPage из localStorage или state
        ? filters.reduce((acc: Record<string, any>, key) => {
            // Проверка, существует ли ключ в acc перед добавлением, т.к значения некоторых ключей установлены на фронте и их нельзя перезаписывать
            if (!(key.header in acc)) {
                acc[key.header] = [];
            }
            return acc;
        }, DEFAULT_REQUEST)
        : DEFAULT_REQUEST;

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: startValues,
    })

    // после получения фильтров записываем их для последующего сравнения
    useEffect(() => {
        prevQueries.current = { ...startValues, ...getQuery() }
    }, [startValues]);

    // изменение prevForm для сравнения после каждой отправки
    useEffect(() => {
        prevQueries.current = { ...startValues, ...getQuery() }
    }, [methods.formState.submitCount, JSON.stringify(getQuery())])

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
            setQuery({ ...formData, page: 1 }, shouldReplace); // второй параметр true делает replace истории
            prevQueries.current = { ...formData, page: 1 };
        } else {
            methods.setValue('page', formData.page);
            setQuery({ ...formData, page: formData.page }, shouldReplace)
        }
    }

    /**
     * Логика сброса формы и последующего обновления таблицы до дефолтного состояния
     */
    function customResetHandler(): void {
        methods.reset();
        methods.handleSubmit(data => customSubmitHandler(data))()
    }


    /**
     * установка значений инпутов при обновлении или переходе по ссылке, если в query что-то есть 
     */
    useEffect(() => {
        /**
         * фильтры приходят с БЭКа, поэтому они указаны в зависимости и имеется проверка, что они не falsy
         */
        if (!isEmpty(values(filters))) {
            const newQueries = filters!.reduce((acc: Record<string, any>, item: ISearchingFormItem) => {
                acc[item.header] = [];
                return acc;
            }, {});
            /** 
            * когда фильтры пришли, мы задаем defaultValues через reset, первый аргумент которого будут новые defaultValues
            */
            methods.reset({ ...newQueries, ...DEFAULT_REQUEST }, { keepDefaultValues: false })
        }
        /**
        * Если в URL имеются queries, то после reset заново устанавливаются значения этих полей. 
        * В компонентах фильтра происходит сверка defaultValue и currentValue, они они разнятся то у кнопки рисуется значек
        */
        if (!isEmpty(queries)) {
            keys(queries).forEach(query => {
                methods.setValue(query, queries[query])
            })
        }
    }, [isPending, JSON.stringify(filters)]);

    return (
        <CustomSubmitHandlerContext.Provider value={{ customSubmitHandler, customResetHandler }}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    )
}
