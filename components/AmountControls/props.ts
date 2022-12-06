import { HTMLAttributes } from 'react';
import { BasketItemType } from '../../interfaces';

export interface AmountControlsProps extends HTMLAttributes<HTMLDivElement> {
    initial: number;
    productId: number;
    type: BasketItemType
}
