import Image from 'next/image';
import cn from 'classnames';
import { AuthTab, BreadCrumbs, Container } from '../../components';

import styles from './style.module.scss';

import { useAppContext, useUserContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { FavList } from '../../interfaces';
import { API } from '../../api/axiosConfig';
import { DOMAIN } from '../../api/APIendpoints';
import axios from 'axios';
import userService from '../../services/userService';
import { observer } from 'mobx-react-lite';

export const FavPage = observer((): JSX.Element => {

    const { accessToken } = useUserContext();
    const [favList, setFavlist] = useState<FavList | null>(null);

    useEffect(() => {

        const loadFavs = async () => {
            const res = await API.get<FavList>(DOMAIN + 'api/fav', {

                // headers: {
                //     Authorization: `Bearer ${accessToken}`
                // }
            });
            console.log('RES FROM FAVS', res);

            if (res.status === 200) {
                setFavlist(res.data);
            }
        };
        loadFavs();
    }, []);

    return (
        <Container>
            <BreadCrumbs />
            FavPage
            {favList?.favs &&
                favList.favs.map(el => (<div>{el.product.name}</div>))
            }
        </Container>
    );
});
