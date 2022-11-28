import { useRef } from 'react';
import cn from 'classnames';
import { useScroll } from './useScroll';
import { ScrollProps } from './props';

import styles from './style.module.scss';

export const Scroll = ({ children, width = 5, className, ...rest }: ScrollProps): JSX.Element => {

    const indicatorRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const {
        indicatorSize,
        isDragging,
        handleTrackClick,
        handleIndicatorMouseDown
    } = useScroll({ indicatorRef, trackRef, contentRef });

    return (
        <div className={cn(styles.container, className)} {...rest}>
            <div className={styles.content} ref={contentRef}>
                {children}
            </div>
            <div className={styles.scrollbar}>
                <div className={styles.scrollbarBar} style={{ width }}>
                    <div
                        onClick={handleTrackClick}
                        className={styles.scrollbarTrack}
                        style={{ cursor: isDragging ? 'grabbing' : 'pointer', width }}
                        ref={trackRef}></div>
                    <div
                        onMouseDown={handleIndicatorMouseDown}
                        style={{
                            height: `${indicatorSize}px`,
                            cursor: isDragging ? 'grabbing' : 'grab',
                            width
                        }}
                        className={styles.scrollbarIndicator}
                        ref={indicatorRef}></div>
                </div>
            </div>
        </div>
    );
};
