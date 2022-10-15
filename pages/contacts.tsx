import Head from 'next/head';
import { WithLayout } from '../Layout';

function Contacts(): JSX.Element {
    return (
        <div>
            <Head>
                <title>Contacts</title>
            </Head>
            Contacts
        </div>
    );
}

export default WithLayout(Contacts);