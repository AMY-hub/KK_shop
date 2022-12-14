import { HTMLAttributes } from 'react';

export interface BreadCrumbsProps extends HTMLAttributes<HTMLDivElement> {
    productName?: string;
    categoryId?: string;
    subCategoryId?: string | null;
}