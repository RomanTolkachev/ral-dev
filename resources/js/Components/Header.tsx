import { FunctionComponent, PropsWithChildren } from 'react';
import { Toggle } from './Buttons/Toggle';

interface IProps {
    className?: string
}

export const Header: FunctionComponent<PropsWithChildren<IProps>> = ({ className, children }) => {
    return (
        <header className=' w-full grid grid-cols-[300px_1fr] grid-rows-[auto] text-text-primary'>
            <div className='p-2'>
                <div className='my-block bg-background-block'>первый блок</div>
            </div>
            <div className='p-2'>
                <div className='my-block bg-background-block flex justify-between'>
                    <span>справочники</span>
                    <span>кабинет менеджера</span>
                    <Toggle />
                </div>
            </div>
        </header>
    );
};
