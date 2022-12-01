import { GetStaticProps } from 'next';
import Head from 'next/head';
import { CERTIFICATES } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { Certificate } from '../interfaces';
import { CertificatesPage } from '../pageComponents/CertificatesPage';

interface PageProps {
    certificates: Certificate[];
}

const Certificates = ({ certificates }: PageProps): JSX.Element => {
    const title = 'Подарочные сертификаты в магазин корейской косметики KKshop. Купить косметику из Кореи онлайн с доставкой';
    const description = 'Оригинальная корейская косметика по низким ценам в интернет-магазине KKshop. Косметика из Южной Кореи от официальных поставщиков. Подарочный сертификат в магазин корейской косметики KKshop.';

    return (
        <>
            <Head>
                <title>KKshop - Подарочные сертификаты</title>
                <meta name='description' content={description} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content={process.env.NEXT_PUBLIC_DOMAIN + 'og_image.jpg'} />
                <meta property='og:image:width' content='1200' />
                <meta property='og:image:height' content='630' />
            </Head>
            <CertificatesPage certificates={certificates} />
        </>
    );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const { data } = await API
        .get<{ certificates: Certificate[] }>(CERTIFICATES);

    return {
        props: {
            certificates: data.certificates
        }
    };
};

export default Certificates;