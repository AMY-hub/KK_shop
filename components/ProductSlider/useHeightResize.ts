import { RefObject, useLayoutEffect, useState } from 'react';

type UseHeightResize = (containerRef: RefObject<HTMLDivElement>, elementRef: RefObject<HTMLDivElement>, defaultHeight: number) => [number, number];

export const useHeightResize: UseHeightResize = (containerRef, elementRef, defaultHeight) => {
    const [height, setHeight] = useState<number>(getHeight);
    const [scrollHeight, setScrollHeight] = useState<number>(0);

    function getHeight() {
        return (elementRef.current?.offsetHeight || defaultHeight);
    }
    useLayoutEffect(() => {
        const changeHeight = () => {
            if (elementRef.current && containerRef.current) {
                setHeight(elementRef.current.offsetHeight);
                setScrollHeight(containerRef.current?.scrollHeight - elementRef.current?.offsetHeight);
            }
        };
        changeHeight();

        window.addEventListener('resize', changeHeight);

        return () => window.removeEventListener('resize', changeHeight);
    }, [elementRef, containerRef]);

    return [height, scrollHeight];
};

