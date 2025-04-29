import { FunctionComponent, useContext } from 'react';
import { Toggle } from './Buttons/Toggle';
import { SVG } from './utils/SVG';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/app/providers/AuthProvider';
import { Preloader } from './utils/Preloader';
import { motion } from 'motion/react';

interface IProps {
    className?: string
}

export type TLinkItem = {
    path: string,
    text: string
}

const directories: TLinkItem[] = [
    { path: 'directory/ral', text: "Р.А.Л" },
    { path: 'directory/accreditation-area', text: "Области аккредитации" }
]


export const Header: FunctionComponent<IProps> = ({ className }) => {
    const userData = useContext(AuthContext);
    const user = userData?.userInfo?.name
    const loading = userData?.isFetching
    const location = useLocation()


    return (
        <header className='w-full grid grid-cols-[300px_1fr] grid-rows-[auto] text-text-primary text-sm'>
            <div className='p-2'>
                <div className={` my-block bg-background-block bg-cover bg-norepeat h-full flex items-center`}>
                    <div className='shrink-0 grow-0 px-2'>
                        <SVG burger className='h-4' />
                    </div>
                    <div className='shring grow  '>
                        <div title="На главную" className='cursor-pointer mx-auto bg-input-primary w-28 text-input-text text-sm text-center p-1 h-full shadow-input-page border-black/10 rounded-full focus:border-transparent'>
                            <Link to='/'>
                                <SVG className='h-8' home />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-2'>
                <nav className={` my-block bg-background-block bg-cover bg-norepeat h-full flex justify-between items-center`}>
                    <div className='flex ml-10 gap-10'>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='min-w-8'>
                            {user ? <Link to="/personal">{user}</Link>  : loading ? <Preloader widthStyles='w-6' /> : 
                            <Link to={`/login`} state={{from: location.pathname}} >войти</Link>}
                            
                        </div>
                        <Link to={`${location.pathname}/settings`} state={{from: location.pathname}} className={`${location.pathname === '/' ? "hidden" : "" }`}>
                            <motion.div whileHover={{ scale: 1.05, cursor: "pointer" }}><SVG gear className='size-6' /></motion.div>
                        </Link>
                        <div className='h-8'><Toggle /></div>
                    </div>
                </nav>
            </div>
        </header>
    );
};
