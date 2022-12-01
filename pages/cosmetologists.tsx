import Head from 'next/head';
import { CosmetClubPage } from '../pageComponents/CosmetClubPage';

function Cosmetologists(): JSX.Element {
    const title = 'Как вступить в клуб косметологов KKshop.ru';
    const description = 'Правила регистрации в клубе косметологов KKshop.ru для Москвы и регионов РФ';

    return (
        <>
            <Head>
                <title>KKshop - Клуб косметологов</title>
                <meta name='description' content={description} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + 'og_club.jpg'} />
                <meta property='og:image:width' content='657' />
                <meta property='og:image:height' content='693' />
            </Head>
            <CosmetClubPage />
        </>
    );
}

export default Cosmetologists;