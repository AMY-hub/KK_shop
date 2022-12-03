import { HTMLAttributes } from 'react';
import { Delivery } from '../../../interfaces';

export interface OrderPreviewProps extends HTMLAttributes<HTMLDivElement> {
    deliveryPrice: number;
    pickPrice: number;
    deliveryType: Delivery
}