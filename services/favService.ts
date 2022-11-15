import { AxiosResponse } from 'axios';
import { FAV, FAV_ITEM } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { FavProduct } from '../interfaces';

class FavService {

    loadFavList = async (): Promise<AxiosResponse<FavProduct[]>> => {
        return API.get<FavProduct[]>(FAV);
    };

    addProduct = async (productId: number): Promise<AxiosResponse<FavProduct>> => {
        return API.post<FavProduct>(FAV_ITEM, { productId });
    };

    deleteProduct = async (favProductId: number): Promise<AxiosResponse<number>> => {
        return API.delete<number>(FAV_ITEM + `/${favProductId}`);
    };
}

export default new FavService();