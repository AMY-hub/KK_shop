import { observer } from 'mobx-react-lite';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { CATALOG } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Category } from '../interfaces';
import userService from '../services/userService';
import { state, UserStore } from '../store/store';

interface AppContext {
    catalog: Category[];
    city: string;
}

const AppContext = createContext<AppContext | undefined>(undefined);
const UserContext = createContext<UserStore | undefined>(undefined);

export const ContextProvider = observer(({ children }: PropsWithChildren): JSX.Element => {
    const [city, setCity] = useState<string>('Санкт-Петербург');
    const [catalog, setCatalog] = useState<Category[]>([]);

    useEffect(() => {
        const loadCatalog = async () => {
            const { data } = await API.get<{ categories: Category[] }>(CATALOG);
            setCatalog(data.categories);
        };
        loadCatalog();
        console.log('CATALOG LOADED IN CONTEXT');

        if (userService.getAccessToken()) {
            console.log('CHECK AUTH RUN');
            state.checkAuth();
        }
    }, []);

    return (
        <AppContext.Provider value={{
            catalog,
            city
        }}>
            <UserContext.Provider value={
                state
            }>
                {children}
            </UserContext.Provider>
        </AppContext.Provider >
    );
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("Context doesn't have value provider");
    }
    return context;
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("Context doesn't have value provider");
    }
    return context;
};