import { useRef, useState } from 'react';
import Image from 'next/image';
import { animate, AnimateSharedLayout, AnimationOptions, motion, PanInfo, useMotionValue } from 'framer-motion';
import { useHeightResize } from './useHeightResize';
import { ProductSliderProps } from './props';

import styles from './style.module.scss';

export const ProductSlider = ({ images }: ProductSliderProps): JSX.Element => {

    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);

    const [height, scrollHeight] = useHeightResize(sliderRef, slideRef, 550);

    const slides = images.map((img, idx) => (
        <motion.div
            ref={slideRef}
            className={styles.sliderSlide}
            key={img}
        >
            <Image
                draggable="false"
                src={process.env.NEXT_PUBLIC_DOMAIN + img}
                layout='intrinsic'
                width={550}
                height={550}
            />
        </motion.div>
    ));

    function Pagination() {
        return (
            <AnimateSharedLayout>
                <div className={styles.pagination}>
                    {images.map((el, idx) => (
                        <div
                            key={el}
                            className={styles.dotWrapper}
                            onClick={() => setCurrentIdx(idx)}
                        >
                            <div className={styles.dot}>
                                {currentIdx === idx && (
                                    <motion.div
                                        layoutId="highlight"
                                        className={styles.dot_active} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </AnimateSharedLayout>
        );
    }

    return (
        <div>
            <motion.div
                style={{ height }}
                className={styles.slider}
                ref={containerRef}
            >
                <motion.div
                    ref={sliderRef}
                    drag="y"
                    whileTap={{ cursor: 'grabbing' }}
                    dragConstraints={{ bottom: 0, top: -scrollHeight }}
                    key={scrollHeight}
                    className={styles.sliderWrapper}>
                    {slides}
                </motion.div>
            </motion.div>
            <Pagination />
        </div>
    );
};

