import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>({defaultValues: {"perPage": 10}})
    useEffect(() => {
        methods.setValue("perPage", 10) //TODO тут нужен инпут с perPage
    }, [])
    return <FormProvider {...methods}>
        {children}
    </FormProvider>
}
