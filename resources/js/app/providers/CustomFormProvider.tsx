import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'
import { useRalFilters } from '@/features/ralTable/api/useRalFilters'
import useParamsCustom from '@/shared/query/useParamsCustom'

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [, getQuery] = useParamsCustom()
    const { data: filters } = useRalFilters()
    const URLQueries = getQuery()

    /* Устанавливаем default для полей формы. Везде пускай будет массив. Т.к поля фильтров запрашиваются асинхронно,
    добавил несколько проверок, чтобы default всегда были валидны  */
    const startValues = !filters //TODO: выдергивать perPage из localStorage
        ? { page: 1, perPage: 10 }
        : !filters.length
          ? {}
          : { ...filters.reduce((acc, key) => ({ ...acc, [key.header]: [] }), { page: 1, perPage: 10 }) }
    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({
        defaultValues: startValues,
    })

    /* В этом месте через reset задаю значения всем полям, передав в параметрах объекты, где ключ-имя инпута,
    плюс, в этом месте мы задаем форме значения из URL*/
    useEffect(() => {
        methods.reset({ ...startValues, ...URLQueries })
    }, [JSON.stringify(startValues)])

    return <FormProvider {...methods}>{children}</FormProvider>
}
