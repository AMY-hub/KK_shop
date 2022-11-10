import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ClientPortalProps } from './props';

export const ClientPortal = ({ children, selector }: ClientPortalProps) => {

    const ref = useRef<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector(selector);
        setMounted(true);
    }, [selector]);

    if (mounted && ref.current) {
        return createPortal(children, ref.current);
    } else {
        return null;
    }
};