import { HTMLAttributes } from 'react';
import { ProductPreview } from '../../../interfaces';

export interface PreviewCardProps extends HTMLAttributes<HTMLDivElement> {
    productData: ProductPreview;
    amount: number;
}