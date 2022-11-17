import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserContext } from '../../context/AppContext';
import { ProfilePage } from '../../pageComponents/ProfilePages';

const Profile = () => {
    const status = useUserContext().status;
    const user = useUserContext().user;
    const router = useRouter();

    useEffect(() => {
        if (!user && status !== 'loading') {
            router.push('/login');
        }
    }, [status, user, router]);

    if (status === 'loading') {
        return (<div>Loading...</div>);
    }

    return (
        <>
            <Head>
                <title>Профиль пользователя</title>
            </Head>
            <ProfilePage />
        </>
    );
};

export default observer(Profile);
