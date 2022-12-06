import { AxiosResponse } from 'axios';
import { FAV, FAV_ITEM } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { FavProduct } from '../interfaces';

class FavService {

    async loadFavList(): Promise<AxiosResponse<FavProduct[]>> {
        return API.get<FavProduct[]>(FAV);
    }

    async addProduct(productId: number): Promise<AxiosResponse<FavProduct>> {
        return API.post<FavProduct>(FAV_ITEM, { productId });
    }

    async deleteProduct(favProductId: number): Promise<AxiosResponse<number>> {
        return API.delete<number>(FAV_ITEM + `/${favProductId}`);
    }
}

export default new FavService();