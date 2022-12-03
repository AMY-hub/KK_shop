import { Delivery, Payment } from '../../interfaces';

export interface OrderFormFields {
    delivery: Delivery;
    address: string;
    name: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    privacy: boolean;
    payment: Payment
}

export interface OrderCreateResponse {
    orderNumber: string;
    points: number | undefined;
}

export interface OrderCreateData {
    userId: number | null;
    delivery: Delivery;
    address: string;
    name: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    payment: Payment;
    price: number;
    delivery_price: number;
    bonus_discount: number;
    products: Array<{ id: number, amount: number }>
}
