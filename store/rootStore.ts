
import { AppStore } from './appStore';
import { BasketStore } from './basketStore';
import { FavStore } from './favStore';
import { UserStore } from './userStore';

export interface RootHydration {
    appData: {
        city: string;
    }
}

export class RootStore {

    appStore: AppStore;
    userStore: UserStore;
    favStore: FavStore;
    basketStore: BasketStore;

    constructor() {
        this.appStore = new AppStore(this);
        this.userStore = new UserStore(this);
        this.favStore = new FavStore(this);
        this.basketStore = new BasketStore(this);
    }

    hydrate(data: RootHydration) {
        if (data.appData) {
            this.appStore.hydrate(data.appData);
        }
    }
}

export const rootStore = new RootStore();