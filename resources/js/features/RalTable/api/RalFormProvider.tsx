import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren, useEffect, useMemo } from 'react'
import { useRalFilters } from '@/features/ralTable/api/useRalFilters'
import useParamsCustom from '@/shared/query/useParamsCustom'
import DEFAULT_REQUEST from '../config'
import { isEmpty, keys, values } from 'lodash'
import { ISearchingFormItem } from '@/shared/types/searchingFilters'
import { useSelectorTyped } from '@/features/store/typedUseSelector'

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [, getQuery] = useParamsCustom();
    const userFilters = useSelectorTyped(state => state.userState.settings)
    const { data: filters, isPending } = useRalFilters(userFilters);

    const queries = getQuery();

    /* Устанавливаем default для полей формы. Везде массив. Т.к поля фильтров запрашиваются асинхронно,
    установлено несколько проверок, чтобы default всегда были валидны  */
    //TODO: выдергивать perPage из localStorage
    const startValues = filters
        ? filters.reduce((acc: Record<string, any>, key) => {
            // Проверка, существует ли ключ в acc перед добавлением, т.к значения некоторых ключей установлены на фронте и их нельзя перезаписывать
            if (!(key.header in acc)) {
                acc[key.header] = [];
            }
            return acc;
        }, { ...DEFAULT_REQUEST })
        /** */
        : DEFAULT_REQUEST;

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        defaultValues: startValues,
    })



    /* установка значений инпутов при обновлении или переходе по ссылке, если в query что-то есть */
    useEffect(() => {
        /*
        фильтры приходят с БЭКа, поэтому они указаны в зависимости и имеется проверка, что они не falsy
        */ 
        if (!isEmpty(values(filters))) {
            const newQueries = filters!.reduce((acc: Record<string, any>, item: ISearchingFormItem) => {
                acc[item.header] = [];
                return acc;
            }, {});
            /*
            когда фильтры пришли, мы задаем defaultValues через reset, первый аргумент которого будут новые defaultValues
            */ 
            methods.reset({ ...newQueries, ...DEFAULT_REQUEST }, { keepDefaultValues: false })
        }

        /* 
        Если в URL имеются queries, то после reset нужно заново установить значения этих полей. 
        В компонентах фильтра происходит сверка defaultValue и currentValue, они они разнятся то у кнопки рисуется значек
        */
        if (!isEmpty(queries)) {
            keys(queries).forEach(query => {
                methods.setValue(query, queries[query])
            })
        }
    }, [isPending, JSON.stringify(filters)]);

    return <FormProvider {...methods}>{children}</FormProvider>
}
