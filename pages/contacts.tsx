import { YMaps } from '@pbe/react-yandex-maps';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ADDRESS } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Address } from '../interfaces';
import { ContactsPage } from '../pageComponents/ContactsPage';

interface PageProps {
    points: Address[];
}

function Contacts({ points }: PageProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Contacts</title>
            </Head>
            <YMaps>
                <ContactsPage points={points} />
            </YMaps>
        </>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const { data } = await API.get<Address[]>(ADDRESS);
    return {
        props: {
            points: data
        }
    };
};

export default Contacts;