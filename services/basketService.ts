import { AxiosResponse } from 'axios';
import { BASKET, BASKET_ITEM, PROMO } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { BasketProduct, PromoCode } from '../interfaces';

class BasketService {

    getBasket = async (): Promise<AxiosResponse<BasketProduct[]>> => {
        return API.get<BasketProduct[]>(BASKET);
    };

    addProduct = async (productId: number): Promise<AxiosResponse<BasketProduct>> => {
        return API.post<BasketProduct>(BASKET_ITEM, { productId });
    };

    deleteProduct = async (basketProductId: number): Promise<AxiosResponse<number>> => {
        return API.delete<number>(BASKET_ITEM + `/${basketProductId}`);
    };

    updateProduct = async (basketProductId: number, amount: number): Promise<AxiosResponse<BasketProduct>> => {
        return API.put<BasketProduct>(BASKET_ITEM + `/${basketProductId}`, {
            amount
        });
    };

    checkPromo = async (name: string): Promise<AxiosResponse<PromoCode | null>> => {
        return API.post<PromoCode | null>(PROMO, { name });
    };

    clearBasket = async (basketId: number): Promise<AxiosResponse<number>> => {
        return API.delete<number>(BASKET + `/${basketId}`);
    };
}

export default new BasketService();