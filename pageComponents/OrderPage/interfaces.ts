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
