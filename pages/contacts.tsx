import Head from 'next/head';
import { ContactsPage } from '../pageComponents/ContactsPage';

function Contacts(): JSX.Element {
    return (
        <>
            <Head>
                <title>Contacts</title>
            </Head>
            <ContactsPage />
        </>
    );
}

export default Contacts;