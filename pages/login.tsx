import Head from 'next/head';
import { LoginPage } from '../pageComponents/LoginPage';

function Login(): JSX.Element {
    return (
        <>
            <Head>
                <title>Авторизация</title>
            </Head>
            <LoginPage />
        </>
    );
}

export default Login;