import { HTMLAttributes } from 'react';
import { Review } from '../../interfaces';

export interface ProductFullCardProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    nameRus: string;
    img: string;
    addImages: string[];
    volume: string;
    price: number;
    discount: number | null;
    art: string;
    reviews: Review[]
}