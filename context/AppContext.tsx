import { enableStaticRendering, observer } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { RootHydration, RootStore } from '../store/rootStore';
import { RootContextProps } from './props';

enableStaticRendering(typeof window === 'undefined');

let store: RootStore;

const RootContext = createContext<RootStore | undefined>(undefined);

export const ContextProvider = observer(({ children, hydrationData }: RootContextProps): JSX.Element => {

    const store = initStore(hydrationData);

    return (
        <RootContext.Provider value={store}>
            {children}
        </RootContext.Provider >
    );
});

const initStore = (initData?: RootHydration): RootStore => {
    const _store = store ?? new RootStore();
    if (initData) {
        _store.hydrate(initData);
    }

    if (typeof window === "undefined") return _store;

    if (!store) store = _store;
    console.log('STORE INIT!', store);

    return _store;
};

export const useRootContext = () => {
    const context = useContext(RootContext);
    if (context === undefined) {
        throw new Error("Context doesn't have value provider");
    }
    return context;
};

export const useFavContext = () => {
    const { favStore } = useRootContext();
    return favStore;
};

export const useBasketContext = () => {
    const { basketStore } = useRootContext();
    return basketStore;
};

export const useUserContext = () => {
    const { userStore } = useRootContext();
    return userStore;
};

export const useAppContext = () => {
    const { appStore } = useRootContext();
    return appStore;
};