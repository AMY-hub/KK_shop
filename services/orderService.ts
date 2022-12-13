import { AxiosResponse } from 'axios';
import { ORDER } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Delivery, Order, OrderCreateResponse, Payment } from '../interfaces';

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
    products: Array<{ id: number, amount: number }>;
    certificates: Array<{ id: number, amount: number }>;
}

class OrderService {
    async getAllOrders(): Promise<AxiosResponse<Order[]>> {
        return API.get<Order[]>(ORDER);
    }

    async createOrder(data: OrderCreateData): Promise<AxiosResponse<OrderCreateResponse>> {
        return API.post<OrderCreateData, AxiosResponse<OrderCreateResponse>, OrderCreateData>(ORDER, data);
    }
}

export default new OrderService();