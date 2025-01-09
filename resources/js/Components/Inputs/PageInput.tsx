import React, { FunctionComponent, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelectorTyped } from '@/services/hooks/typedUseSelector.ts'

interface IProps {
    className?: string
    formName?: string
    lastPage?: number
}

export const PageInput: FunctionComponent<IProps> = ({ className, formName = 'page', lastPage = 1 }) => {
    const { register, formState, trigger, setValue, control } = useFormContext()
    const page = useSelectorTyped((state) => state.filtersReducer.queries.page)

    useEffect(() => {
        pageRef.current = page
    }, [page])
    const pageRef = useRef<HTMLInputElement | null>(null)

    return (
        <>
            <input
                {...register(formName, {
                    min: 1,
                    max: lastPage,
                    onChange: () => trigger(),
                })}
                className={
                    `${formState.errors[formName] && 'ring-2 !ring-error border-transparent '}` +
                    ' w-20 bg-background-block rounded-md focus:border-transparent ' +
                    'focus:ring-2 focus:ring-input-border-active'
                }
                defaultValue={1}
                min={1}
                max={lastPage}
                type={'number'}
            />
            {formState.errors[formName] && <div className={'text-error'}>Некорректное число</div>}
        </>
    )
}
