import { HTMLAttributes } from 'react';

export interface SpecialCardProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    nameRus: string;
    price: number;
    img: string;
    type: 'square' | 'long';
    size?: 'm' | 'l';
}