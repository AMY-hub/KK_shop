import { makeAutoObservable } from 'mobx';
import { Category } from '../interfaces';
import { RootStore } from './rootStore';

export interface AppHydration {
    city: string;
    catalog: Category[];
}

export class AppStore {
    private root: RootStore;
    city = 'Москва';
    catalog: Category[] = [];

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    hydrate(data: AppHydration) {
        if (data) {
            this.city = data.city;
            this.catalog = data.catalog;
        }
    }
}