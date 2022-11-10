import { RefObject, useEffect } from 'react';

type UseClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (e: Event) => void) => void;

export const useClickOutside: UseClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (e: Event) => {
            if (!handler || !ref?.current || ref.current.contains(e.target as Node)) {
                return;
            }
            handler(e);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstar', listener);
        };
    }, [ref, handler]);
};
