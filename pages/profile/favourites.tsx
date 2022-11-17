import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserContext } from '../../context/AppContext';
import { FavPage } from '../../pageComponents/ProfilePages/FavPage';
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
        return (<div>Loading...</div>);
    }

    return (
        <>
            <Head>
                <title>Избранное</title>
            </Head>
            {user &&
                <ProfileLayout
                    user={user}
                    title='Мой лист пожеланий'>
                    <FavPage />
                </ProfileLayout>}
        </>
    );
};

export default observer(Favourites);