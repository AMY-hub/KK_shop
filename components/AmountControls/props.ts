import { HTMLAttributes } from 'react';

export interface AmountControlsProps extends HTMLAttributes<HTMLDivElement> {
    initial: number;
    productId: number;
}
