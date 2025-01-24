import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren, useEffect, useMemo } from 'react'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'
import useParamsCustom from '@/services/hooks/useParamsCustom.ts'
import DEFAULT_REQUEST from '../config'

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

    const [, getQuery] = useParamsCustom();
    const { data: filters } = useRalFilters();


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
        : {};

    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        defaultValues: startValues,
    })

    /* В этом месте через reset задается значение всем полям, передав в параметрах объекты, где ключ-имя инпута,
    плюс, в этом месте форме задаются значения из URL*/
    useEffect(() => {
        methods.reset({ ...startValues })
    }, [JSON.stringify(startValues)])

    return <FormProvider {...methods}>{children}</FormProvider>
}
