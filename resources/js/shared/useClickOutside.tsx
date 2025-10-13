import { RefObject, useEffect } from 'react';

export const useClickOutside = (
    ref: RefObject<HTMLElement>,
    callback: () => void,
    isEnabled: boolean = true,
    excludeRef?: RefObject<HTMLElement>
) => {
    useEffect(() => {
        if (!isEnabled) return;

        const handleClick = (event: MouseEvent) => {
            if (excludeRef?.current && excludeRef.current.contains(event.target as Node)) {
                return;
            }

            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, callback, isEnabled, excludeRef]);
};