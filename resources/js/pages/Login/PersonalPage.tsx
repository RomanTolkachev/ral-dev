import { AuthContext } from '@/app/providers/AuthProvider';
import { Preloader } from '@/Components/utils/Preloader';
import { MainButton } from '@/shared/ui/Buttons/MainButton';
import { FunctionComponent, useContext } from 'react';

export const PersonalPage: FunctionComponent = () => {

    const loginContext = useContext(AuthContext);

    if (!loginContext) {
        return <Preloader widthStyles='size-8' />
    }

    const { userInfo } = loginContext;
    const { reFetchUser } = loginContext

    return (

        <div className='flex flex-col gap-5 items-center justify-center text-table-base h-full'>
            <ul>
                <li className='flex justify-between gap-6'>
                    <span>Имя</span><span>{userInfo?.name}</span>
                </li>
                <li className='flex justify-between gap-6'>
                    <span>e-mail</span><span>{userInfo?.email}</span>
                </li>
                <li className='flex justify-between gap-6'>
                    <span>id</span><span>{userInfo?.id}</span>
                </li>
                <li className='flex justify-between gap-6'>
                    <span>роль</span><span>{userInfo?.role ?? "не присвоена"}</span>
                </li>
            </ul>
            <MainButton onClick={reFetchUser} color={'red'} className='!w-32'>Выход</MainButton>
        </div>
    );
};
