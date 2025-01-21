import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'
import { useRalFilters } from '@/services/hooks/useRalFilters.ts'
import useParamsCustom from '@/services/hooks/useParamsCustom.ts'

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [, getQuery] = useParamsCustom();
    const { data: queries } = useRalFilters();
    const URLQueries = getQuery();

    /* Устанавливаем default для полей формы. Везде массив. Т.к поля фильтров запрашиваются асинхронно,
    установлено несколько проверок, чтобы default всегда были валидны  */
    const startValues = !queries //TODO: выдергивать perPage из localStorage
        ? { page: 1, perPage: 10 }
        : !queries.length
          ? {}
          : { ...queries.reduce((acc, key) => ({ ...acc, [key.header]: [] }), { page: 1, perPage: 10, }) }
    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        defaultValues: startValues,
    })

    /* В этом месте через reset задается значение всем полям, передав в параметрах объекты, где ключ-имя инпута,
    плюс, в этом месте форме задаются значения из URL*/
    useEffect(() => {
        methods.reset({ ...startValues, ...URLQueries })
    }, [JSON.stringify(startValues)])

    return <FormProvider {...methods}>{children}</FormProvider>
}
