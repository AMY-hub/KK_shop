import { HTMLAttributes } from 'react';
import { ProductPreview } from '../../../interfaces';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
    productData: ProductPreview;
}