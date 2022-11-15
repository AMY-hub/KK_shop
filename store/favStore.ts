import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { FavProduct } from '../interfaces';
import favService from '../services/favService';
import { RootStore } from './rootStore';

export class FavStore {
    private _root: RootStore;
    private _favList: FavProduct[] = [];
    error = '';

    constructor(root: RootStore) {
        this._root = root;
        makeAutoObservable(this);
    }

    setError(message: string) {
        this.error = message;
    }

    getFavList() {
        return this._favList;
    }

    setFavList(data: FavProduct[]) {
        this.setError('');
        this._favList = data;
    }

    addFavProduct = async (productId: number) => {
        try {
            const res = await favService.addProduct(productId);
            if (res.status === 200) {
                runInAction(() => {
                    this.setError('');
                    this._favList.push(res.data);
                });
            }
        } catch (err) {
            this.setError(getErrorMessage(err));
            console.log(err);
        }
    };

    deleteFavProduct = async (productId: number) => {
        try {
            const favItem = this._favList.find(f => f.productId === productId);
            if (!favItem) return;

            const res = await favService.deleteProduct(favItem.id);
            if (res.status === 200 && res.data && this._favList) {
                runInAction(() => {
                    this.setError('');
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this._favList = this._favList.filter(f => f.id !== favItem.id);
                });
            }
        } catch (err) {
            this.setError(getErrorMessage(err));
            console.log(err);
        }
    };

    isProductFav = (productId: number) => {
        return this._favList.find(f => f.productId === productId);
    };

    toggleProduct = (productId: number) => {
        const favItem = this.isProductFav(productId);
        if (favItem) {
            this.deleteFavProduct(productId);
        } else {
            this.addFavProduct(productId);
        }
    };
}
