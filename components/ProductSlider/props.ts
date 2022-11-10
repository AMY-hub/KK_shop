import { HTMLAttributes } from 'react';

export interface ProductSliderProps extends HTMLAttributes<HTMLDivElement> {
    images: string[];
}