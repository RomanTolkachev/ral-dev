import React, {
    FC,
    ReactNode,
    ReactElement,
    useRef,
    cloneElement,
} from 'react';
import { Tooltip } from './Tooltip'; // путь к твоему Tooltip

interface WrappingTooltipProps {
    content: ReactNode;
    children: ReactElement;
    className?: string;
    delay?: number;
    hideDelay?: number;
    maxWidth?: string;
    maxHeight?: string;
    distanceFromTrigger?: number;
    windowEdgeMargin?: number;
    padding?: number;
}

export const WrappingTooltip: FC<WrappingTooltipProps> = ({
    content,
    children,
    className = '',
    delay = 400,
    hideDelay = 300,
    maxWidth,
    maxHeight,
    distanceFromTrigger,
    windowEdgeMargin,
    padding,
}) => {
    const triggerRef = useRef<HTMLElement>(null);

    const clonedChild = cloneElement(children, {
        ref: triggerRef,
    });

    return (
        <>
            {clonedChild}
            <Tooltip
                content={content}
                triggerRef={triggerRef}
                className={className}
                delay={delay}
                hideDelay={hideDelay}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                distanceFromTrigger={distanceFromTrigger}
                windowEdgeMargin={windowEdgeMargin}
                padding={padding}
            />
        </>
    );
};
