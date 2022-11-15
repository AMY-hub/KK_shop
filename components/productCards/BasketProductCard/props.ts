import { HTMLAttributes } from 'react';
import { ProductPreview } from '../../../interfaces';

export interface BasketProductProps extends HTMLAttributes<HTMLDivElement> {
    productData: ProductPreview;
    amount: number;
}