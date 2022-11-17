import { useRouter } from 'next/router';
import { Container, AuthTab, Title } from '../../components';

import styles from './style.module.scss';

export const LoginPage = (): JSX.Element => {
    const router = useRouter();

    return (
        <Container className={styles.login}>
            <Title tag='h1'>
                Войдите или зарегистрируйтесь.
            </Title>
            <Title tag='h2'>
                Получите персональную бонусную карту при регистрации!
            </Title>
            <AuthTab
                onAuth={() => router.back()}
                className={styles.loginForm} />
        </Container>
    );
};
