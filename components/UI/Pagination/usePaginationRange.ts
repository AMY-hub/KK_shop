import { useMemo } from 'react';

type UsePaginationRange = (pagesCount: number, currentPage: number, maxVisible: number) => Array<number | '...'>;

export const usePaginationRange: UsePaginationRange = (pagesCount, currentPage, maxVisible) => {
    const range = (start: number, end: number): number[] => {
        const rangeArr: number[] = [];
        for (let i = start; i <= end; i++) {
            rangeArr.push(i);
        }
        return rangeArr;
    };

    const paginationRange: Array<number | '...'> = useMemo(() => {
        if (pagesCount <= 9) {
            return range(1, pagesCount);
        }
        const dots = '...';
        const maxRightVisible = pagesCount - maxVisible;
        const maxLeftVisible = maxVisible;

        if (currentPage > maxLeftVisible && currentPage < maxRightVisible) {
            const visibleBorders = Math.ceil(maxVisible / 2);
            return [
                1,
                dots,
                ...range(currentPage - visibleBorders, currentPage + visibleBorders),
                dots,
                pagesCount
            ];
        }

        if (currentPage <= maxLeftVisible) {
            return [...range(1, maxLeftVisible + 1), dots, pagesCount];
        }

        if (currentPage >= maxRightVisible) {
            return currentPage === maxRightVisible ?
                [1, dots, ...range(maxRightVisible - 1, pagesCount)]
                : [1, dots, ...range(maxRightVisible, pagesCount)];
        }

        return range(1, pagesCount);
    }, [pagesCount, currentPage, maxVisible]);

    return paginationRange;
};