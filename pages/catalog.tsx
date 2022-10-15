import Head from 'next/head';
import { WithLayout } from '../Layout';

function Catalog(): JSX.Element {
    return (
        <div>
            <Head>
                <title>Catalog</title>
            </Head>
            Catalog
        </div>
    );
}

export default WithLayout(Catalog);