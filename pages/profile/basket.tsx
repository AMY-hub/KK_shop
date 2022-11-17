import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserContext } from '../../context/AppContext';
import { BasketPage } from '../../pageComponents/ProfilePages/BasketPage';
import { ProfileLayout } from '../../pageComponents/ProfilePages/ProfileLayout';

const Basket = () => {
    const status = useUserContext().status;
    const user = useUserContext().user;
    const router = useRouter();

    useEffect(() => {
        if (!user && status !== 'loading') {
            router.push('/login');
        }
    }, [status, user, router]);

    if (!user && status === 'loading') {
        return (<div>Loading...</div>);
    }

    return (
        <>
            <Head>
                <title>Корзина</title>
            </Head>
            {user &&
                <ProfileLayout
                    user={user}
                    title='Моя корзина'>
                    <BasketPage />
                </ProfileLayout>}
        </>
    );
};

export default observer(Basket);