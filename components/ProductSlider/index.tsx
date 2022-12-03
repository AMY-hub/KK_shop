import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductSliderProps } from './props';

import styles from './style.module.scss';

export const ProductSlider = ({ images, className, ...rest }: ProductSliderProps): JSX.Element => {

    const [page, setPage] = useState(0);

    const slides = images.map((img, idx) => (
        <motion.div
            className={styles.sliderSlide}
            key={img}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            drag="y"
            whileTap={{ cursor: 'grabbing' }}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
                if (offset.y < 0) {
                    paginate(-1);
                }
                if (offset.y > 0) {
                    paginate(1);
                }
            }}>
            <div className={styles.sliderImg}>
                <Image
                    draggable="false"
                    src={process.env.NEXT_PUBLIC_DOMAIN + img}
                    alt={`Изображение товара ${idx + 1}`}
                    layout='intrinsic'
                    width={550}
                    height={550}
                />
            </div>
        </motion.div>
    ));

    const paginate = (direction: number) => {
        if (page + direction < images.length && page + direction >= 0) {
            setPage(page + direction);
        } else if (page + direction === images.length) {
            setPage(0);
        } else if (page + direction === -1) {
            setPage(images.length - 1);
        }
    };

    function Pagination() {
        return (
            <div className={styles.pagination}>
                {images.map((el, idx) => (
                    <button
                        key={el}
                        aria-label={`К изображению ${idx + 1}`}
                        className={styles.dotWrapper}
                        onClick={() => setPage(idx)}
                    >
                        <div className={styles.dot}>
                            <AnimatePresence>
                                {page === idx && (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0.1, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.1, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={styles.dot_active} />
                                )}
                            </AnimatePresence>
                        </div>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={cn(styles.wrapper, className)} {...rest}>
            <div className={styles.slider}>
                {images.length !== 0 &&
                    <AnimatePresence initial={false}>
                        {slides[page]}
                        <div className={styles.fake}>
                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN + images[0]}
                                layout='intrinsic'
                                width={550}
                                height={550}
                            />
                        </div>
                    </AnimatePresence>
                }
            </div>
            <Pagination />
        </div>
    );
};

