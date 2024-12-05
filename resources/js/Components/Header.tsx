import React, {FunctionComponent, PropsWithChildren} from 'react';

interface IProps {
    className?: string
}

export const Header: FunctionComponent<PropsWithChildren<IProps>> = ({className, children}) => {
    return (
        <div className={'p-2'}>
            <header className={`${className} my-block p-2 bg-blue-200`}>
                {children}
            </header>
        </div>
    );
};
