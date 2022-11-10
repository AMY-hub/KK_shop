import { Container, AuthTab, Title } from '../../components';

import styles from './style.module.scss';

export const LoginPage = (): JSX.Element => {
    return (
        <Container className={styles.login}>
            <Title tag='h1'>
                Войдите или зарегистрируйтесь.
            </Title>
            <Title tag='h2'>
                Получите персональную бонусную карту при регистрации!
            </Title>
            <AuthTab className={styles.loginForm} />
        </Container>
    );
};
