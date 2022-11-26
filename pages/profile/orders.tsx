import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Preloader } from '../../components';
import { useUserContext } from '../../context/AppContext';
import { OrdersPage } from '../../pageComponents/ProfilePages/OrdersPage';
import { ProfileLayout } from '../../pageComponents/ProfilePages/ProfileLayout';

const Favourites = () => {
    const status = useUserContext().status;
    const user = useUserContext().user;
    const router = useRouter();

    useEffect(() => {
        if (!user && status !== 'loading') {
            router.push('/login');
        }
    }, [status, user, router]);

    if (!user && status === 'loading') {
        return <Preloader />;
    }

    return (
        <>
            <Head>
                <title>Мои заказы</title>
            </Head>
            {user &&
                <ProfileLayout
                    user={user}
                    title='Мои заказы'>
                    <OrdersPage />
                </ProfileLayout>}
        </>
    );
};

export default observer(Favourites);