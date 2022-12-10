import { HTMLAttributes } from 'react';

export interface FavProductCardProps extends HTMLAttributes<HTMLDivElement> {
    productId: number;
    name: string;
    name_rus: string;
    price: number;
    img: string;
    discount?: number;
}