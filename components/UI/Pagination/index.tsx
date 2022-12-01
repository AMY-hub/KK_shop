import { useRouter } from 'next/router';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { PaginationProps } from './props';
import { usePaginationRange } from './usePaginationRange';

import styles from './style.module.scss';

export const Pagination = ({ pagesCount, currentPage, className, ...props }: PaginationProps): JSX.Element => {

    const router = useRouter();
    const pagesInterval = 5;
    const paginationRange = usePaginationRange(pagesCount, currentPage, pagesInterval);

    console.log('PAGE: ', currentPage);

    const handlePageNav = (page: number) => {
        let newPage = page;
        if (newPage < 1) {
            newPage = 1;
        }
        if (newPage > pagesCount) {
            newPage = pagesCount;
        }

        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: newPage }
        });
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: currentPage - 1 }
            });
        }
    };

    const handleNext = () => {
        if (currentPage < pagesCount) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: currentPage + 1 }
            });
        }
    };

    const handleDots = (idx: number) => {
        if (idx < 5) {
            handlePageNav(currentPage - 3);
        } else {
            handlePageNav(currentPage + 3);
        }
    };

    const animationConfig = {
        whileHover: { scale: 1.2 }
    };

    const paginationButtons = paginationRange.map((p, idx) => {
        let dotsCount = 0;
        if (typeof p === 'number') {
            return (
                <motion.button
                    {...animationConfig}
                    className={cn(styles.paginationPage, {
                        [styles.paginationPage_active]: currentPage == p
                    })}
                    aria-label={`На страницу ${p}`}
                    onClick={() => handlePageNav(p)}
                    key={p}>
                    {p}
                </motion.button>
            );
        } else {
            dotsCount += 1;
            return (
                <button
                    className={styles.paginationDots}
                    onClick={() => handleDots(idx)}
                    key={'dot' + dotsCount}
                >
                    {p}
                </button>
            );
        }
    });

    return (
        <>
            {pagesCount < 2 ? null
                :
                <div className={cn(styles.pagination, className)} {...props}>
                    <motion.button
                        aria-label='К предыдущей странице'
                        className={cn(styles.paginationPrev, 'icon-arr_left')}
                        disabled={currentPage === 1}
                        onClick={handlePrev}
                        {...animationConfig}>
                    </motion.button>
                    <div className={styles.paginationPages}>
                        {paginationButtons}
                    </div>
                    <motion.button
                        aria-label='К следующей странице'
                        className={cn(styles.paginationPrev, 'icon-arr_right')}
                        disabled={currentPage === pagesCount}
                        onClick={handleNext}
                        {...animationConfig}>
                    </motion.button>
                </div>}
        </>
    );
};
