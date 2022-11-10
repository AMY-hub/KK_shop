import { HTMLAttributes } from 'react';
import { ProductPreview } from '../../interfaces';

export interface ProductsSliderProps extends HTMLAttributes<HTMLDivElement> {
    products: ProductPreview[];
    title?: string;
    sliderId: string | number;
    size?: 'm' | 'l';
}