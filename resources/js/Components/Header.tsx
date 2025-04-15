import { FunctionComponent, PropsWithChildren } from 'react';
import { Toggle } from './Buttons/Toggle';
import { HeaderNavButton } from './Buttons/headerNavButton/ui/HeaderNavButton';
import { SVG } from './utils/SVG';
import { Link } from 'react-router';

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

export const Header: FunctionComponent<PropsWithChildren<IProps>> = ({ className, children }) => {
    return (
        <header className='w-full grid grid-cols-[300px_1fr] grid-rows-[auto] text-text-primary text-sm'>
            <div className='p-2'>
                <div className='my-block bg-background-block h-full flex items-center'>
                    <div className='shrink-0 grow-0 px-2'>
                        <SVG burger className='h-4' />
                    </div>
                    <div  className='shring grow  '>
                        <div title="На главную" className='cursor-pointer mx-auto bg-input-primary w-28 text-input-text text-sm text-center p-1 h-full shadow-input-page border-black/10 rounded-full focus:border-transparent'>
                            <Link to='/'>
                                <SVG className='h-8' home />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-2'>
                <div className='my-block bg-background-block h-full flex justify-between items-center'>
                    <div className='flex ml-10 gap-10'>
                        <HeaderNavButton links={directories}>
                            Cправочники
                        </HeaderNavButton>
                        <span className='bg-header-nav-button text-header-nav-text py-1 px-8 rounded-full shadow-md'>Кабинет менеджера</span>
                    </div>
                    <Toggle />
                </div>
            </div>
        </header>
    );
};
