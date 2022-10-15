import Head from 'next/head';
import { WithLayout } from '../Layout';

function Certificates(): JSX.Element {
    return (
        <div>
            <Head>
                <title>Certificates</title>
            </Head>
            Certificates
        </div>
    );
}

export default WithLayout(Certificates);