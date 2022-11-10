import Image from 'next/image';
import cn from 'classnames';
import { AuthTab, BreadCrumbs, Container } from '../../components';

import styles from './style.module.scss';
import { useAppContext } from '../../context/AppContext';

export const ProfilePage = (): JSX.Element => {

    const { isLoggedIn, logout } = useAppContext();

    return (
        <Container>
            <BreadCrumbs />
            ProfilePage
            {isLoggedIn &&
                <button onClick={logout}>
                    LOGOUT
                </button>}
            <AuthTab />
        </Container>
    );
};
