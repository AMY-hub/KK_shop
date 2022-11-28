import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { LoginFormFields, RegisterFormFields, UserData, UserResponse } from '../interfaces';
import tokenService from '../services/tokenService';
import userService from '../services/userService';
import { RootStore } from './rootStore';

export class UserStore {
    private _root: RootStore;
    private _user: UserData | null = null;
    private _error = '';
    isLoggedIn = false;
    status: 'idle' | 'loading' = 'idle';

    constructor(root: RootStore) {
        this._root = root;
        this.checkAuth();
        makeAutoObservable(this);
    }

    get user() {
        return this._user;
    }

    set error(message: string) {
        this._error = message;
    }

    get error() {
        return this._error;
    }

    setUser(data: UserResponse) {
        this.error = '';
        this.isLoggedIn = true;
        this._user = data.user;
        this._root.basketStore.basket = data.basket;
        this._root.favStore.favList = data.fav_list;
        tokenService.setAccessToken(data.accessToken);
    }

    resetUser() {
        this._error = '';
        this.isLoggedIn = false;
        this._user = null;
        this._root.basketStore.basket = [];
        this._root.favStore.favList = [];
        tokenService.removeAccessToken();
    }

    async login(data: LoginFormFields) {
        try {
            this.status = 'loading';
            const res = await userService.login(data);
            if (res.status === 200) {
                runInAction(() => {
                    this.setUser(res.data);
                    this.status = 'idle';
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
        }
    }

    async registration(data: RegisterFormFields) {
        try {
            this.status = 'loading';
            const res = await userService.registration(data);
            if (res.status === 200) {
                runInAction(() => {
                    this.setUser(res.data);
                    this.status = 'idle';
                });
            }
        } catch (err) {
            this.error = getErrorMessage(err);
        }
    }

    async logout() {
        try {
            await userService.logout();
            this.resetUser();
        } catch (err) {
            this.error = getErrorMessage(err);
        }
    }

    async checkAuth() {
        try {
            this.status = 'loading';
            const res = await userService.checkAuth();
            if (res.status === 200) {
                runInAction(() => {
                    this.setUser(res.data);
                    this.status = 'idle';
                });
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                return;
            } else {
                this.error = getErrorMessage(err);
            }
        }
    }

    updateBonusCard = (points: number) => {
        if (this._user) {
            this._user.bonus_card.points = points;
        }
    };
}
