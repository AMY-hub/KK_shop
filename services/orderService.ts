import { AxiosResponse } from 'axios';
import { ORDER } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { BasketProduct } from '../interfaces';

class OrderService {

    getAllOrders = async (): Promise<AxiosResponse<BasketProduct[]>> => {
        return API.get<BasketProduct[]>(ORDER);
    };

    createOrder = async (productId: number): Promise<AxiosResponse<BasketProduct>> => {
        return API.post<BasketProduct>(ORDER, { productId });
    };
}

export default new OrderService();