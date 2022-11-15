import { HTMLAttributes } from 'react';
import { ProductDetails } from '../../../interfaces';

export interface ProductFullCardProps extends HTMLAttributes<HTMLDivElement> {
    productData: ProductDetails;
}