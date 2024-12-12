import React, {FunctionComponent} from 'react';

interface IProps {
    className?: string
    width: string
}

export const Preloader: FunctionComponent<IProps> = ({className, width}) => {
    return (
        <div className={`${className} w-full h-full flex justify-center items-center`}>
            <div className={`w-${width}`}>
                <div className={`preloader`}></div>
            </div>
        </div>
    );
};
