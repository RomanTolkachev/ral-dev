import { AuthContext } from '@/app/providers/AuthProvider';
import { Preloader } from '@/Components/utils/Preloader';
import { MainButton } from '@/shared/ui/Buttons/MainButton';
import { useQueryClient } from '@tanstack/react-query';
import { FunctionComponent, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
    className?: string;

}

const PersonalPage: FunctionComponent<Props> = ({ className }) => {

    const loginContext = useContext(AuthContext);

    if (!loginContext) {
        return <Preloader widthStyles='size-8' />
    }

    const { userInfo } = loginContext;
    const { reFetchUser } = loginContext
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    // const { refetch } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: getUser,
    //     enabled: false, // Отключаем автоматический запрос (будет вызываться вручную)
    // });


    return (
        <div className={`${className} h-full w-full flex flex-col gap-5 items-center justify-center`}>
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
            </ul>
            <MainButton onClick={reFetchUser} color={'red'} className='!w-32'>Выход</MainButton>
        </div>
    );
};

export default PersonalPage;