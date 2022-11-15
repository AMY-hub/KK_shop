import { HTMLAttributes } from 'react';
import { ProductPreview } from '../../../interfaces';

export interface FavProductCardProps extends HTMLAttributes<HTMLDivElement> {
    productData: ProductPreview;
}