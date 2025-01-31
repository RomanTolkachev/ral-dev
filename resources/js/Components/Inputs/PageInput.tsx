import { FunctionComponent, useMemo } from 'react'
import { FieldError, useFormContext, FieldErrorsImpl, Merge } from 'react-hook-form'

interface IProps {
    className?: string
    formName?: string
    lastPage?: number
}

export const PageInput: FunctionComponent<IProps> = ({ className, formName = 'page', lastPage = 1 }) => {
    const { register, formState, trigger } = useFormContext()

    function getErrorMessage(error: FieldError | Merge<FieldError, FieldErrorsImpl<any>>): string | undefined {
        switch (error.type) {
            case 'required':
                return 'поле не может быть пустым'
            case 'min':
                return 'некорректное значение'
            case 'max':
                return 'некорректное значение'
        }
    }

    return (
        <>
            <input
                {...register(formName, {
                    min: 1,
                    max: lastPage,
                    onChange: () => trigger(),
                    required: 'поле не может быть пустым',
                })}
                className={
                    `${formState.errors[formName] && 'ring-2 !ring-error border-transparent '}` +
                    ` ${className} w-20 bg-background-block rounded-md focus:border-transparent ` +
                    'focus:ring-2 focus:ring-input-border-active'
                }
                min={1}
                max={lastPage}
                type="number"
            />
            {formState.errors[formName] && (
                <div className={'text-error'}>{getErrorMessage(formState.errors[formName])}</div>
            )}
        </>
    )
}
