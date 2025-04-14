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
        <header className='w-full grid grid-cols-[300px_1fr] grid-rows-[auto] text-text-primary'>
            <div className='p-2'>
                <div className='my-block bg-background-block h-full flex items-center justify-center'>
                    <Link to='/'>
                        <div title="На главную" className='cursor-pointer bg-input-primary w-28 text-input-text text-sm text-center p-1 h-full shadow-input-page border-black/10 rounded-full focus:border-transparent'>
                            <SVG className='h-8' home />
                        </div>
                    </Link>
                </div>
            </div>
            <div className='p-2'>
                <div className='my-block bg-background-block h-full flex justify-between items-center'>
                    <HeaderNavButton links={directories}>
                        справочники
                    </HeaderNavButton>
                    <span>кабинет менеджера</span>
                    <Toggle />
                </div>
            </div>
        </header>
    );
};
