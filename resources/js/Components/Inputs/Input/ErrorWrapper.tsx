import { FC, ReactNode } from 'react';

interface ErrorWrapperProps {
    children: ReactNode;
    fieldName: string;
    errors: any;
    isAbsolute?: boolean
}

export const ErrorWrapper: FC<ErrorWrapperProps> = ({
    children,
    errors,
    fieldName,
    isAbsolute = true
}) => {
    const error = errors[fieldName];
    const errorMessage = error ? (error.type === 'required' ? "обязательное поле" : error.message) : undefined;

    return (
        <div className="relative">
            <div className={`${isAbsolute ? "mb-6" : ""}`}>
                {children}
            </div>
            {errorMessage && (
                <span className={`
                    ${isAbsolute ? "absolute bottom-0 translate-y-full -translate-x-1/2 left-1/2" : "block text-center"} 
                    text-error text-nowrap  
                `}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
};