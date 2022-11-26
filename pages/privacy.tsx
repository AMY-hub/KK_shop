import Head from 'next/head';

import { PrivacyPage } from '../pageComponents/PrivacyPage';

const Privacy = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>Политика конфиденциальности</title>
            </Head>
            <PrivacyPage />
        </>
    );
};

export default Privacy;