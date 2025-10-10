import { FC, ReactNode } from 'react';

interface ErrorWrapperProps {
    children: ReactNode;
    fieldName: string;
    errors: any;
}

export const ErrorWrapper: FC<ErrorWrapperProps> = ({
    children,
    errors,
    fieldName
}) => {
    const error = errors[fieldName];
    const errorMessage = error ? (error.type === 'required' ? "обязательное поле" : error.message) : undefined;

    return (
        <div className="relative">
            <div className='mb-6'>
                {children}
            </div>
            {errorMessage && (
                <span className="absolute bottom-0 text-error text-nowrap translate-y-full left-1/2 -translate-x-1/2">
                    {errorMessage}
                </span>
            )}
        </div>
    );
};