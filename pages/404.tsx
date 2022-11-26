import Head from 'next/head';
import { Error404Page } from '../pageComponents/404';

export function Error404(): JSX.Element {
    return (
        <>
            <Head>
                <title>Страница не найдена</title>
            </Head>
            <Error404Page />
        </>
    );
}

export default Error404;