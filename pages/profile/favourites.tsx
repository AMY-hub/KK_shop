import Head from 'next/head';
import { FavPage } from '../../pageComponents/FavPage';

const Favourites = () => {

    return (
        <>
            <Head>
                <title>Избранное</title>
            </Head>
            <FavPage />
        </>
    );
};

export default Favourites;