import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { LoginFormFields, RegisterFormFields, UserData, UserResponse } from '../interfaces';
import tokenService from '../services/tokenService';
import userService from '../services/userService';
import { RootStore } from './rootStore';

export class UserStore {
    private _root: RootStore;
    private _userData: UserData | null = null;
    isLoggedIn = false;
    private _status: 'idle' | 'loading' | 'error' = 'idle';
    error = '';

    constructor(root: RootStore) {
        this._root = root;
        this.checkAuth();
        makeAutoObservable(this);
    }

    setUser(data: UserResponse) {
        console.log('Set USER', data);
        this.error = '';
        this.isLoggedIn = true;
        this._userData = data.user;
        this._root.basketStore.setBasket(data.basket);
        console.log('USER BASKET SET', data.basket);

        this._root.favStore.setFavList(data.fav_list);
        tokenService.setAccessToken(data.accessToken);
    }

    get user() {
        return this._userData;
    }

    get status() {
        return this._status;
    }

    updateBonusCard = (points: number) => {
        if (this._userData) {
            this._userData.bonus_card.points = points;
        }
    };

    resetUser() {
        this.error = '';
        this.isLoggedIn = false;
        this._userData = null;
        this._root.basketStore.setBasket([]);
        this._root.favStore.setFavList([]);
        tokenService.removeAccessToken();
    }

    login = async (data: LoginFormFields): Promise<void> => {
        try {
            this._status = 'loading';
            const res = await userService.login(data);
            if (res.status === 200) {
                runInAction(() => {
                    this.setUser(res.data);
                    this._status = 'idle';
                });
            }
        } catch (err) {
            this._status = 'error';
            this.error = getErrorMessage(err);
        }
    };

    registration = async (data: RegisterFormFields): Promise<void> => {
        try {
            this._status = 'loading';
            const res = await userService.registration(data);
            if (res.status === 200) {
                runInAction(() => {
                    this.setUser(res.data);
                    this._status = 'idle';
                });
            }
        } catch (err) {
            this._status = 'error';
            this.error = getErrorMessage(err);
        }
    };

    logout = async (): Promise<void> => {
        try {
            await userService.logout();
            this.resetUser();
        } catch (err) {
            this._status = 'error';
            this.error = getErrorMessage(err);
        }
    };

    checkAuth = async (): Promise<void> => {
        try {
            this._status = 'loading';
            const res = await userService.checkAuth();
            if (res.status === 200) {
                runInAction(() => {
                    this.setUser(res.data);
                    this._status = 'idle';
                });
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                return;
            } else {
                this._status = 'error';
                this.error = getErrorMessage(err);
            }
        }
    };
}
