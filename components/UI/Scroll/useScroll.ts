import { MouseEventHandler, RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollProps {
    indicatorRef: RefObject<HTMLDivElement>,
    trackRef: RefObject<HTMLDivElement>,
    contentRef: RefObject<HTMLDivElement>
}
interface UseScrollReturn {
    indicatorSize: number,
    isDragging: boolean,
    handleTrackClick: MouseEventHandler<HTMLDivElement>,
    handleIndicatorMouseDown: MouseEventHandler<Element>
}

export const useScroll = ({ indicatorRef, trackRef, contentRef }: UseScrollProps): UseScrollReturn => {

    const [indicatorSize, setIndicatorSize] = useState<number>(15);
    const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const observer = useRef<ResizeObserver | null>(null);

    const moveScrollIndicator = useCallback(() => {
        if (contentRef.current && indicatorRef.current && trackRef.current) {
            const { scrollTop, scrollHeight } = contentRef.current;
            const { clientHeight: trackHeight } = trackRef.current;
            let newTop = (scrollTop / scrollHeight) * trackHeight;
            newTop = Math.min(newTop, trackHeight - indicatorSize);
            indicatorRef.current.style.top = `${newTop}px`;
        }
    }, [indicatorSize, contentRef, trackRef, indicatorRef]);

    const handleTrackClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const { current: track } = trackRef;
        const { current: content } = contentRef;
        if (track && content) {
            const { clientY } = e;
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            const indicatorOffset = -(indicatorSize / 2);
            const clickRatio = (clientY - trackTop + indicatorOffset) / track.clientHeight;
            const scroll = Math.floor(clickRatio * content.scrollHeight);

            content.scrollTo({
                top: scroll,
                behavior: 'smooth',
            });
        }
    }, [indicatorSize, contentRef, trackRef]);

    const handleIndicatorMouseDown: MouseEventHandler = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current) {
            setInitialScrollTop(contentRef.current.scrollTop);
            setIsDragging(true);
        }
    }, [contentRef]);

    const handleIndicatorMouseUp = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            setIsDragging(false);
        }
    }, [isDragging]);

    const handleIndicatorMouseMove = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (contentRef.current && isDragging && scrollStartPosition) {
            const { scrollHeight, offsetHeight } = contentRef.current;
            const deltaY =
                (e.clientY - scrollStartPosition) *
                (offsetHeight / indicatorSize);
            const newScrollTop = Math.min(
                initialScrollTop + deltaY, scrollHeight - offsetHeight
            );
            contentRef.current.scrollTop = newScrollTop;
        }
    }, [isDragging, scrollStartPosition, indicatorSize, initialScrollTop, contentRef]);

    const handleContentResize = (ref: HTMLDivElement, trackSize: number) => {
        const { clientHeight, scrollHeight } = ref;
        setIndicatorSize(Math.max((clientHeight / scrollHeight) * trackSize, 15));
    };

    useEffect(() => {
        if (contentRef.current && trackRef.current) {
            const content = contentRef.current;
            const { clientHeight } = trackRef.current;
            observer.current = new ResizeObserver(() => {
                handleContentResize(content, clientHeight);
            });
            observer.current.observe(content);
            content.addEventListener('scroll', moveScrollIndicator);
            return () => {
                observer.current?.unobserve(content);
                content.removeEventListener('scroll', moveScrollIndicator);
            };
        }
    }, [moveScrollIndicator, contentRef, trackRef]);

    useEffect(() => {
        document.addEventListener('mousemove', handleIndicatorMouseMove);
        document.addEventListener('mouseup', handleIndicatorMouseUp);
        document.addEventListener('mouseleave', handleIndicatorMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleIndicatorMouseMove);
            document.removeEventListener('mouseup', handleIndicatorMouseUp);
            document.removeEventListener('mouseleave', handleIndicatorMouseUp);
        };
    }, [handleIndicatorMouseMove, handleIndicatorMouseUp]);

    return {
        indicatorSize,
        isDragging,
        handleTrackClick,
        handleIndicatorMouseDown
    };
};