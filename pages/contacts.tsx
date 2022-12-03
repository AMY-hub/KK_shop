import { YMaps } from '@pbe/react-yandex-maps';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ADDRESS } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Address } from '../interfaces';
import { ContactsPage } from '../pageComponents/ContactsPage';

interface PageProps {
    addresses: Address[];
}

function Contacts({ addresses }: PageProps): JSX.Element {
    const title = 'Контакты интернет-магазина KKshop.ru';
    const description = 'Адреса розничных магазинов KKshop в Москве и Санкт-Петербурге, пункты самовывоза KKshop. Контактный телефон KKshop 8495 2592500. Почтовый адрес Sale@kkshop.ru';

    return (
        <>
            <Head>
                <title>KKshop - Контакты</title>
                <meta name='description' content={description} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + 'og_contacts.jpg'} />
                <meta property='og:image:width' content='917' />
                <meta property='og:image:height' content='502' />
            </Head>
            <YMaps>
                <ContactsPage addresses={addresses} />
            </YMaps>
        </>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const { data } = await API.get<Address[]>(ADDRESS);
    return {
        props: {
            addresses: data
        }
    };
};

export default Contacts;