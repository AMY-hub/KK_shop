import { HTMLAttributes } from 'react';
import { Sale } from '../../../interfaces';

export interface SpecialCardProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    nameRus: string;
    price: number;
    img: string;
    sale: Sale | null;
    type: 'square' | 'long';
    size?: 'm' | 'l';
}