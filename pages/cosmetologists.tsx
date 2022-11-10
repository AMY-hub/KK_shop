import Head from 'next/head';
import { CosmetClubPage } from '../pageComponents/CosmetClubPage';

function Cosmetologists(): JSX.Element {
    return (
        <>
            <Head>
                <title>Cosmetologists</title>
            </Head>
            <CosmetClubPage />
        </>
    );
}

export default Cosmetologists;