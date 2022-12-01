import Head from 'next/head';
import { DeliveryPage } from '../pageComponents/DeliveryPage';

function Delivery(): JSX.Element {
    const title = 'Купить корейскую косметику с бесплатной доставкой | Корейская косметика самовывоз | Интернет-магазин KKshop';
    const description = 'Информация о вариантах доставки в зависимости от региона и способах оплаты в магазине KKshop.ru';

    return (
        <>
            <Head>
                <title>KKshop - Доставка</title>
                <meta name='description' content={title} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + 'og_contacts.jpg'} />
                <meta property='og:image:width' content='917' />
                <meta property='og:image:height' content='502' />
            </Head>
            <DeliveryPage />
        </>
    );
}

export default Delivery;

