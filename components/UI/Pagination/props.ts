import { HTMLAttributes } from 'react';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
    pagesCount: number;
    currentPage: number;
}