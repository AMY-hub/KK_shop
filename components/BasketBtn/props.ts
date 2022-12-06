import { BasketItemType } from '../../interfaces';

export interface BasketBtnProps {
    productId: number;
    productType?: BasketItemType;
    onClick?: () => void;
}
