import { AxiosResponse } from 'axios';
import { BASKET, BASKET_ITEM, PROMO } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { BasketCertificate, BasketItemType, BasketProduct, PromoCode } from '../interfaces';

class BasketService {

    async getBasket(): Promise<AxiosResponse<Array<BasketProduct | BasketCertificate>>> {
        return API.get<Array<BasketProduct | BasketCertificate>>(BASKET);
    }

    async addProduct<T extends BasketItemType>(itemId: number, type: T): Promise<AxiosResponse<T extends 'product' ? BasketProduct : BasketCertificate>> {
        return API.post<T extends 'product' ? BasketProduct : BasketCertificate>(BASKET_ITEM, { itemId, type });
    }

    async deleteProduct(basketProductId: number, type: BasketItemType): Promise<AxiosResponse<number>> {
        return API.delete<number>(BASKET_ITEM + `/${type}/${basketProductId}`);
    }

    async updateProduct<T extends BasketItemType>(basketProductId: number, amount: number, type: BasketItemType): Promise<AxiosResponse<T extends 'product' ? BasketProduct : BasketCertificate>> {
        return API.put<T extends 'product' ? BasketProduct : BasketCertificate>(BASKET_ITEM + `/${type}/${basketProductId}`, {
            amount
        });
    }

    async checkPromo(name: string): Promise<AxiosResponse<PromoCode | null>> {
        return API.post<PromoCode | null>(PROMO, { name });
    }

    async clearBasket(basketId: number): Promise<AxiosResponse<number>> {
        return API.delete<number>(BASKET + `/${basketId}`);
    }
}

export default new BasketService();