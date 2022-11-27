import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { FavProduct } from '../interfaces';
import favService from '../services/favService';
import { RootStore } from './rootStore';

export class FavStore {
    private _root: RootStore;
    private _favList: FavProduct[] = [];
    private _error = '';

    constructor(root: RootStore) {
        this._root = root;
        makeAutoObservable(this);
    }

    get favList() {
        return this._favList;
    }

    set favList(data: FavProduct[]) {
        this.error = '';
        this._favList = data;
    }

    set error(message: string) {
        this._error = message;
    }

    get error() {
        return this._error;
    }

    async addFavProduct(productId: number) {
        try {
            const res = await favService.addProduct(productId);
            if (res.status === 200) {
                runInAction(() => {
                    this._error = '';
                    this._favList.push(res.data);
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

    async deleteFavProduct(productId: number) {
        try {
            const favItem = this._favList.find(f => f.productId === productId);
            if (!favItem) return;

            const res = await favService.deleteProduct(favItem.id);
            if (res.status === 200 && res.data && this._favList) {
                runInAction(() => {
                    this._error = '';
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this._favList = this._favList.filter(f => f.id !== favItem.id);
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
            console.log(err);
        }
    }

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
