import Link from 'next/link';
import { Container, Paragraph, Title } from '../../components';
import NotFoundIcon from '../../assets/images/icons/404-icon.svg';

import styles from './style.module.scss';

export const Error404Page = (): JSX.Element => {

    return (
        <Container className={styles.notFound}>
            <div className={styles.notFoundHeader}>
                <NotFoundIcon />
                <Title tag='h1'><span>404</span> - страница не найдена</Title>
            </div>

            <Paragraph className={styles.notFoundText}>
                Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена или был введен неверный адрес в адресной строке.
            </Paragraph>
            <Paragraph className={styles.notFoundText}>
                Попробуйте
                <Link href={'/'}>
                    <a> вернуться на главную страницу.</a>
                </Link>
            </Paragraph>
        </Container>
    );
};
