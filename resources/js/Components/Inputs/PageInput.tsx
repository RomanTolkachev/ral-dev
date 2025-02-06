import { CustomSubmitHandlerContext } from '@/features/ralTable/api/RalFormProvider'
import { FunctionComponent, ReactNode, useContext, useMemo } from 'react'
import { FieldError, useFormContext, FieldErrorsImpl, Merge, Controller } from 'react-hook-form'

interface IProps {
    className?: string
    formName?: string
    lastPage?: number
}

export const PageInput: FunctionComponent<IProps> = ({ className, formName = 'page', lastPage = 1 }) => {
    const { control, register, formState, trigger, getValues } = useFormContext();
    const { customSubmitHandler } = useContext(CustomSubmitHandlerContext)

    return (
        <Controller
            name={formName}
            control={control}
            rules={{ 
                required: 'поле не может быть пустым',
                min: {value: 1, message: "значение не может быть меньше 1"}, 
                max: {value: lastPage, message: "такая страница отсутстует"}
            }}
            render={({ field: { onChange: formChange, value } }) => (
                <>
                    <input
                        min={1}
                        max={lastPage}
                        value={value}
                        onChange={async (e) => {
                            console.log(formChange)
                            formChange(e)
                            const isValid = await trigger();
                            isValid && customSubmitHandler(getValues())   
                        }}
                        className={
                            `${formState.errors[formName] && 'ring-2 !ring-error border-transparent '}` +
                            ` ${className} w-20 bg-background-block rounded-md focus:border-transparent ` +
                            'focus:ring-2 focus:ring-input-border-active'
                        }

                        type="number"
                    />
                    {formState.errors[formName] && (
                        <div className={'text-error'}>
                            {formState.errors[formName].message as ReactNode}
                        </div>
                    )}
                </>
            )
            }
        />
    )
}
