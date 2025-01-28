import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren, useEffect, useMemo } from 'react'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'
import useParamsCustom from '@/services/hooks/useParamsCustom.ts'
import DEFAULT_REQUEST from '../config'
<<<<<<< HEAD
import { isEmpty, keys, values } from 'lodash'
import splitValue from '@/Components/Inputs/InputCustom/features/splitValue'
import joinValue from '@/Components/Inputs/InputCustom/features/joinValue'
import { ISearchingFormItem } from '@/types/searchingFilters'
=======
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [, getQuery] = useParamsCustom();
<<<<<<< HEAD
    const { data: filters, isPending } = useRalFilters();

    const queries = getQuery();
=======
    const { data: filters } = useRalFilters();

>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

    /* Устанавливаем default для полей формы. Везде массив. Т.к поля фильтров запрашиваются асинхронно,
    установлено несколько проверок, чтобы default всегда были валидны  */
    //TODO: выдергивать perPage из localStorage
<<<<<<< HEAD
    const startValues = filters
=======

        const startValues = filters 
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9
        ? filters.reduce((acc: Record<string, any>, key) => {
            // Проверка, существует ли ключ в acc перед добавлением, т.к значения некоторых ключей установлены на фронте и их нельзя перезаписывать
            if (!(key.header in acc)) {
                acc[key.header] = [];
            }
            return acc;
        }, { ...DEFAULT_REQUEST })
<<<<<<< HEAD
        : DEFAULT_REQUEST;
=======
        : {};
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        defaultValues: startValues,
    })

<<<<<<< HEAD


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
=======
    /* В этом месте через reset задается значение всем полям, передав в параметрах объекты, где ключ-имя инпута,
    плюс, в этом месте форме задаются значения из URL*/
    useEffect(() => {
        methods.reset({ ...startValues })
    }, [JSON.stringify(startValues)])
>>>>>>> 5cd68ef02ab17dbac86ecbef952d4fff31cc9af9

    return <FormProvider {...methods}>{children}</FormProvider>
}
