import { HTMLAttributes } from 'react';

export interface PreviewCardProps extends HTMLAttributes<HTMLDivElement> {
    img: string;
    name: string;
    amount: number;
}