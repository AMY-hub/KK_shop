import { HTMLAttributes } from 'react';

export interface OrderPreviewProps extends HTMLAttributes<HTMLDivElement> {
    deliveryPrice: number;
}