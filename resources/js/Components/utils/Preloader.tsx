import React, {FunctionComponent} from 'react';

interface IProps {
    className?: string
}

export const Preloader: FunctionComponent<IProps> = ({className}) => {
    return (
        <div className={`${className} mx-auto my-auto`}>
            <div className={'preloader'}></div>
        </div>
    );
};
