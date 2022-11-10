import Head from 'next/head';
import { DeliveryPage } from '../pageComponents/DeliveryPage';

function Delivery(): JSX.Element {
    return (
        <>
            <Head>
                <title>Delivery</title>
            </Head>
            <DeliveryPage />
        </>
    );
}

export default Delivery;

