import { makeAutoObservable } from 'mobx';
import { CATALOG } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Category } from '../interfaces';
import { RootStore } from './rootStore';

export interface AppHydration {
    city: string;
}

export class AppStore {
    private root: RootStore;
    private _city = 'Санкт-Петербург';
    private _catalog: Category[] = [];

    constructor(root: RootStore) {
        this.root = root;
        this.loadCatalog();
        makeAutoObservable(this);
    }

    async loadCatalog() {
        try {
            const { data: { categories } } = await API.get<{ categories: Category[] }>(CATALOG);
            if (categories) {
                this._catalog = categories;
            }
        } catch (err) {
            console.log(err);
        }
    }

    get catalog() {
        return this._catalog;
    }

    get city() {
        return this._city;
    }

    set city(city: string) {
        this._city = city;
    }

    hydrate(data: AppHydration) {
        if (data) {
            this._city = data.city;
        }
    }
}