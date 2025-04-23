import { getUser, login } from '@/shared/api/api';
import { IUser } from '@/shared/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createContext, FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface Props {
    className?: string;

}

interface IAuthContext {
    user: {
        userInfo: IUser | undefined
        isLoading: boolean
        isFetching: boolean
    }
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

    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const {
        data: fetchedUser,
        isFetching,
        isLoading
    } = useQuery({
        queryKey: ['user'],
        retry: (errCount, err: AxiosError) => {
            return err.status === 401 || err.status === 404 ? false : true // тут счетчик с начинается с нуля и если он ноль то, все равно летит запрос
        },
        queryFn: getUser,
        enabled: false
    })

    const useLogin = useMutation<IUser, AxiosError, { email: string; password: string }>({
        mutationFn: login,
        retry: (errCount, err: AxiosError) => {
            return err.status === 422 && errCount >= 0 ? false : true // тут счетчик с начинается с нуля и если он ноль то, все равно летит запрос
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/', { replace: true })
        },
    })

    const [data, setData] = useState<IAuthContext | undefined>(undefined)

    useEffect(() => {
        setData({
            user: {
                userInfo: fetchedUser,
                isFetching,
                isLoading
            },
            loginStatus: {
                mutateAsync: useLogin.mutateAsync,
                isLoading: useLogin.isPending,
                error: useLogin.error,
                resetError: useLogin.reset
            }
        })
    }, [fetchedUser?.name, isFetching, useLogin.isPending, useLogin.error, isLoading])

    const methods = useForm<ILoginForm>({
        shouldUnregister: false,
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <AuthContext.Provider value={data}>
            <FormProvider {...methods}>
                {children}
            </FormProvider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;




