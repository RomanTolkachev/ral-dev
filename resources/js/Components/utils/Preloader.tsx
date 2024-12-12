import React, {FunctionComponent} from 'react';

interface IProps {
    className?: string
    widthStyles: string
}

export const Preloader: FunctionComponent<IProps> = ({className, widthStyles}) => {
    return (
        <div className={`${className} w-full h-full flex justify-center items-center`}>
            <div className={`${widthStyles}`}>
                <div className={`preloader`}></div>
            </div>
        </div>
    );
};
