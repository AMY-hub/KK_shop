import Head from 'next/head';

import { PrivacyPage } from '../pageComponents/PrivacyPage';

const Privacy = (): JSX.Element => {
    const title = 'Конфиденциальность личных данных при покупке на сайте KKshop.ru';
    const description = 'Администрация осуществляет хранение данных и обеспечивает их охрану от несанкционированного доступа и распространения в соответствии с внутренними правилами и регламентами.';
    return (
        <>
            <Head>
                <title>Политика конфиденциальности</title>
                <meta name='description' content={title} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
            </Head>
            <PrivacyPage />
        </>
    );
};

export default Privacy;