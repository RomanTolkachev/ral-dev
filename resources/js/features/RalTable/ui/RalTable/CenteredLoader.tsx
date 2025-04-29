import LoadingDots from '@/Components/utils/LoadingDots';
import { FunctionComponent, PropsWithChildren } from 'react';

interface Props {
    className?: string;
}

const CenteredLoader: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <div className={`h-full w-full flex items-center justify-center`}>
            {children}
            <LoadingDots />
        </div>
    );
};

export default CenteredLoader;