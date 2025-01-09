import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { FunctionComponent, PropsWithChildren } from 'react'
import { DevTool } from "@hookform/devtools"

interface IFormValues {
    [key: string]: any
}

export const CustomFormProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const methods: UseFormReturn<IFormValues> = useForm<IFormValues>()
    return <FormProvider {...methods}>
        {children}
    </FormProvider>
}
