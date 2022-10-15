import Head from 'next/head';
import { WithLayout } from '../Layout';

function Cosmetologists(): JSX.Element {
    return (
        <div>
            <Head>
                <title>Cosmetologists</title>
            </Head>
            Cosmetologists
        </div>
    );
}

export default WithLayout(Cosmetologists);