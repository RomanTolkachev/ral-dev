import { DevTool } from '@hookform/devtools';
import React, { FunctionComponent, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AuthContext, ILoginForm } from '@/app/providers/AuthProvider';
import { classes } from './inputClasses';
import { MainButton } from '@/Components/Buttons/MainButton';

interface Props {
    className?: string
}

const LoginPage: FunctionComponent<Props> = ({ className }) => {
    // const { control, getValues, handleSubmit, reset, setError, } = useFormContext<ILoginForm>();
    const authContext = useContext(AuthContext);
    
    if (!authContext) {
        return null
    }
    const {reset, control, handleSubmit} = authContext.methods

    const { loginStatus: { mutateAsync, isLoading, error, resetError } } = authContext;

    const fullReset = (): void => {
        resetError();
        reset(control._defaultValues);
    }



    return (
        <div className={`${className} p-2 h-full`}>
            <DevTool control={control} />
            <div className='my-block bg-background-block h-full flex justify-center items-center'>
                <form onSubmit={handleSubmit(async (data) => mutateAsync(data))} className='flex flex-col gap-5'>
                    <div className='relative w-fit flex flex-col gap-5'>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <input onFocus={resetError} placeholder='e-mail' className={`
                                    ${error && 'ring-2 !ring-error border-transparent '}
                                    ring-transparent
                                    appearance-none
                                    focus:ring-2 focus:ring-button-violet
                                    rounded-full w-full shadow-input-search  border-black/10
                                    bg-input-primary text-input-text
                                    autofill:bg-red-200 focus:autofill:bg-red-200`} onChange={onChange} value={value} />
                                )
                            }} />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <input onFocus={resetError} placeholder='пароль' className={`
                                    ${error && 'ring-2 !ring-error '}
                                    ring-transparent
                                    appearance-none
                                    focus:ring-2 focus:ring-button-violet
                                    rounded-full w-full shadow-input-search  border-black/10
                                    bg-input-primary text-input-text
                                    autofill:bg-red-200 focus:autofill:bg-red-200`} onChange={onChange} value={value} />
                                )
                            }} />

                        <div className='absolute max-w-64 w-full text-center -translate-x-1/2 left-1/2 -translate-y-[calc(100%+20px)] top-0 text-error'>{error?.message && "Введенные данные не верны"}</div>
                    </div>
                    {/* {isLoading ? "загрузка" : "нет загрузки"} */}
                    <MainButton className='w-40 mx-auto' isDisabled={isLoading} type="submit" color='violet'>отправить</MainButton>
                    <MainButton className='w-40 mx-auto' isDisabled={isLoading} type="button" color='violet' onClick={fullReset}>сбросить</MainButton>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;