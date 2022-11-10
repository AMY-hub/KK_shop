import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUserContext } from '../../context/AppContext';
import { ProfilePage } from '../../pageComponents/ProfilePage';

const Profile = () => {

    const { isLoggedIn, userData } = useUserContext();
    const router = useRouter();

    if (!isLoggedIn && typeof window !== 'undefined') {
        router.push('/login');
    }

    return (
        <>
            <Head>
                <title>Профиль пользователя</title>
            </Head>
            {userData &&
                <div>{userData.name}</div>}
            <ProfilePage />
        </>
    );
};

export default Profile;
