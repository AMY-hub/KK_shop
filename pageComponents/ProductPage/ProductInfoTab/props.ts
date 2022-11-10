import { HTMLAttributes } from 'react';
import { Brand, Country, Info } from '../../interfaces';

export interface ProductInfoTabProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    art: string;
    volume: string;
    weight: string;
    info: Info[];
    brand: Brand;
    country: Country;
}