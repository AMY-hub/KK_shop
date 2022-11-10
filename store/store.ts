import { makeAutoObservable } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { Basket, FavList, LoginFormFields, RegisterFormFields, UserData, UserResponse } from '../interfaces';
import favService from '../services/favService';
import userService from '../services/userService';

export class UserStore {
    userData: UserData | null = null;
    basket: Basket | null = null;
    favList: FavList | null = null;
    isLoggedIn = false;
    accessToken = '';
    userError = '';

    constructor() {
        makeAutoObservable(this);
    }

    setAccessToken(token: string) {
        this.accessToken = token;
        userService.setAccessToken(token);
    }

    setError(message: string) {
        this.userError = message;
    }

    setUser(data: UserResponse) {
        console.log('Set USER', data);
        this.setError('');
        this.isLoggedIn = true;
        this.accessToken = data.accessToken;
        this.userData = data.user;
        this.basket = data.basket;
        this.favList = data.fav_list;
        userService.setAccessToken(data.accessToken);
    }

    setBasket(data: Basket) {
        this.basket = data;
    }

    setFavList(data: FavList) {
        this.favList = data;
    }

    resetUser() {
        this.setError('');
        this.isLoggedIn = false;
        this.accessToken = '';
        this.userData = null;
        this.basket = null;
        this.favList = null;
        userService.removeAccessToken();
    }

    login = async (data: LoginFormFields): Promise<void> => {
        console.log('LOGIN in STORE', data);

        try {
            const res = await userService.login(data);
            if (res.status === 200) {
                this.setUser(res.data);
            }
        } catch (err) {
            console.log('SET ERR: ', getErrorMessage(err));

            this.setError(getErrorMessage(err));
        }
    };

    registration = async (data: RegisterFormFields): Promise<void> => {
        try {
            const res = await userService.registration(data);
            if (res.status === 200) {
                this.setUser(res.data);
            }
        } catch (err) {
            this.setError(getErrorMessage(err));
        }
    };

    logout = async (): Promise<void> => {
        try {
            await userService.logout();
            this.resetUser();
        } catch (err) {
            this.setError(getErrorMessage(err));
        }
    };

    checkAuth = async (): Promise<void> => {
        try {
            const res = await userService.checkAuth();
            if (res.status === 200) {
                this.setUser(res.data);
            }
        } catch (err) {
            this.setError(getErrorMessage(err));
        }
    };

    addFavProduct = async (productId: number) => {
        try {
            const res = await favService.addProduct(productId);
            if (res.status === 200) {
                this.favList?.favs.push(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    deleteFavProduct = async (favProductId: number) => {
        try {
            const res = await favService.deleteProduct(favProductId);
            if (res.status === 200 && res.data && this.favList) {
                this.favList.favs = this.favList.favs
                    .filter(f => f.id !== favProductId);
            }
        } catch (err) {
            console.log(err);
        }
    };
}

export const state = new UserStore();
