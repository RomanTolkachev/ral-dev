import { FunctionComponent, PropsWithChildren } from 'react';
import { Toggle } from './Buttons/Toggle';
import { HeaderNavButton } from './Buttons/headerNavButton/ui/HeaderNavButton';

interface IProps {
    className?: string
}

export type TLinkItem = {
    path: string,
    text: string
}

const directories:TLinkItem[] = [
    { path: 'directory/ral', text: "Р.А.Л" },
    { path: 'directory/accreditation-area', text: "Области аккредитации" }
]

export const Header: FunctionComponent<PropsWithChildren<IProps>> = ({ className, children }) => {
    return (
        <header className=' w-full grid grid-cols-[300px_1fr] grid-rows-[auto] text-text-primary'>
            <div className='p-2'>
                <div className='my-block bg-background-block h-full flex items-center justify-center'>первый блок</div>
            </div>
            <div className='p-2'>
                <div className='my-block bg-background-block flex justify-between items-center'>
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
