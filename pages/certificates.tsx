import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { CERTIFICATES } from '../api/APIendpoints';
import { Certificate } from '../interfaces';
import { CertificatesPage } from '../pageComponents/CertificatesPage';

function Certificates({ certificates }: PageProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Certificates</title>
            </Head>
            <CertificatesPage certificates={certificates} />
        </>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const { data } = await axios
        .get<{ certificates: Certificate[] }>(CERTIFICATES);

    return {
        props: {
            certificates: data.certificates
        }
    };
};

interface PageProps {
    certificates: Certificate[];
}

export default Certificates;