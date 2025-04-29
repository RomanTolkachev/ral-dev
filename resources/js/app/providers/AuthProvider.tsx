import { getUser, login, logOut } from '@/shared/api/api';
import { IUser } from '@/shared/types/user';
import { UseMutateFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createContext, FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
    className?: string;

}

interface IAuthContext {
    userInfo: IUser | undefined
    isLoading: boolean
    reFetchUser: UseMutateFunction<IUser, Error, void, unknown>
    isFetching: boolean
    loginStatus: {
        mutateAsync: (data: { email: string; password: string }) => void;
        isLoading: boolean;
        error: AxiosError | null;
        resetError: () => void
    };
}

export interface ILoginForm {
    email: string
    password: string
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

const AuthProvider: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {

    const queryClient = useQueryClient();

    const {
        data: fetchedUser,
        isFetching,
        refetch,
        isLoading
    } = useQuery({
        queryKey: ['user'],
        retry: (errCount, err: AxiosError) => [401, 404].includes(err.status!) ? false : true,
        queryFn: getUser,
    })

    const useLogin = useMutation<IUser, AxiosError, { email: string; password: string }>({
        mutationFn: login,
        retry: (errCount, err: AxiosError) => [422].includes(err.status!) ? false : true,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    })

    const { mutate } = useMutation({
        mutationFn: logOut,
        onSuccess: () => queryClient.removeQueries({ queryKey: ["user"]})
    })

    const contextValue = {
        userInfo: fetchedUser,
        isFetching,
        reFetchUser: mutate,
        isLoading,
        loginStatus: {
            mutateAsync: useLogin.mutateAsync,
            isLoading: useLogin.isPending,
            error: useLogin.error,
            resetError: useLogin.reset
        }
    }

    const methods = useForm<ILoginForm>({
        shouldUnregister: false,
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <AuthContext.Provider value={contextValue}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;




