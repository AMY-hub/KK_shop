import Head from 'next/head';
import { Error500Page } from '../pageComponents/500';

export function Error500(): JSX.Element {
    return (
        <>
            <Head>
                <title>Ошибка сервера</title>
            </Head>
            <Error500Page />
        </>
    );
}

export default Error500;