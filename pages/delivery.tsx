import Head from 'next/head';
import { WithLayout } from '../Layout';

function Delivery(): JSX.Element {
    return (
        <div>
            <Head>
                <title>Delivery</title>
            </Head>
            Delivery
        </div>
    );
}

export default WithLayout(Delivery);

