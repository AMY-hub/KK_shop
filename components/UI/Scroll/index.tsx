import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { ScrollProps } from './props';

import styles from './style.module.scss';

export const Scroll = ({ children, className, ...rest }: ScrollProps): JSX.Element => {

    const [indicatorSize, setIndicatorSize] = useState<number>(15);
    const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const indicatorRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        if (contentRef.current && scrollTrackRef.current) {
            const content = contentRef.current;
            const { clientHeight } = scrollTrackRef.current;
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
    }, []);

    const moveScrollIndicator = useCallback(() => {
        if (contentRef.current && indicatorRef.current && scrollTrackRef.current) {
            const { scrollTop, scrollHeight } = contentRef.current;
            const { clientHeight: barHeight } = scrollTrackRef.current;
            let newTop = (scrollTop / scrollHeight) * barHeight;
            newTop = Math.min(newTop, barHeight - indicatorSize);
            indicatorRef.current.style.top = `${newTop}px`;
        }
    }, []);

    function handleContentResize(ref: HTMLDivElement, trackSize: number) {
        const { clientHeight, scrollHeight } = ref;
        setIndicatorSize(Math.max((clientHeight / scrollHeight) * trackSize, 15));
    }

    function handleScrollButton(direction: 'up' | 'down') {
        if (contentRef.current) {
            const scroll = direction === 'down' ? 50 : -50;
            contentRef.current.scrollBy({ top: scroll, behavior: 'smooth' });
        }
    }

    const handleTrackClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const { current: track } = scrollTrackRef;
        const { current: content } = contentRef;
        if (track && content) {
            const { clientY } = e;
            // Next, figure out the distance between the top of the track and the top of the viewport
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            // We want the middle of the thumb to jump to where we clicked, so we subtract half the thumb's height to offset the position
            const indicatorOffset = -(indicatorSize / 2);
            // Find the ratio of the new position to the total content length using the thumb and track values...
            const clickRatio =
                (clientY - trackTop + indicatorOffset) / track.clientHeight;
            // ...so that you can compute where the content should scroll to.
            const scroll = Math.floor(
                clickRatio * content.scrollHeight
            );
            // And finally, scroll to the new position!
            content.scrollTo({
                top: scroll,
                behavior: 'smooth',
            });
        }
    },
        [indicatorSize]
    );

    const handleIndicatorMousedown: MouseEventHandler = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    }, []);

    const handleIndicatorMouseup = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            setIsDragging(false);
        }
    }, [isDragging]);

    const handleIndicatorMousemove = useCallback((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (contentRef.current && isDragging && scrollStartPosition) {
            const {
                scrollHeight: contentScrollHeight,
                offsetHeight: contentOffsetHeight,
            } = contentRef.current;

            // Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
            const deltaY =
                (e.clientY - scrollStartPosition) *
                (contentOffsetHeight / indicatorSize);
            const newScrollTop = Math.min(
                initialScrollTop + deltaY,
                contentScrollHeight - contentOffsetHeight
            );

            contentRef.current.scrollTop = newScrollTop;
        }
    },
        [isDragging, scrollStartPosition, indicatorSize, initialScrollTop]
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleIndicatorMousemove);
        document.addEventListener('mouseup', handleIndicatorMouseup);
        document.addEventListener('mouseleave', handleIndicatorMouseup);
        return () => {
            document.removeEventListener('mousemove', handleIndicatorMousemove);
            document.removeEventListener('mouseup', handleIndicatorMouseup);
            document.removeEventListener('mouseleave', handleIndicatorMouseup);
        };
    }, [handleIndicatorMousemove, handleIndicatorMouseup]);

    return (
        <div className={cn(styles.container, className)} {...rest}>
            <div className={styles.content} ref={contentRef}>
                {children}
            </div>
            <div className={styles.scrollbar}>
                <button
                    onClick={() => handleScrollButton('up')}
                    className={styles.scrollbarBtnUp}>^</button>
                <div className={styles.scrollbarBar}>
                    <div
                        onClick={handleTrackClick}
                        className={styles.scrollbarTrack}
                        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
                        ref={scrollTrackRef}></div>
                    <div
                        onMouseDown={handleIndicatorMousedown}
                        style={{
                            height: `${indicatorSize}px`,
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                        className={styles.scrollbarIndicator}
                        ref={indicatorRef}></div>
                </div>
                <button
                    onClick={() => handleScrollButton('down')}
                    className={styles.scrollbarBtnDown}>^</button>
            </div>
        </div>
    );
};
