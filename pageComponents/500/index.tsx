import Link from 'next/link';
import { Container, Paragraph, Title } from '../../components';
import ErrorIcon from '../../assets/images/icons/500-icon.svg';

import styles from './style.module.scss';

export const Error500Page = (): JSX.Element => {
    return (
        <Container className={styles.internal}>
            <div className={styles.internalHeader}>
                <ErrorIcon />
                <Title tag='h1'><span>500</span> - ошибка сервера</Title>
            </div>

            <Paragraph className={styles.internalText}>
                На сервере произошла непредвиденная ошибка. Пожалуйста, подождите, она вскоре будет исправлена.
            </Paragraph>
            <Paragraph className={styles.internalText}>
                Попробуйте
                <Link href={'/'}>
                    <a> вернуться на главную страницу.</a>
                </Link>
            </Paragraph>
        </Container>
    );
};
