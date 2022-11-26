import Link from 'next/link';
import styles from './style.module.scss';

export const PrivacyLabel = (): JSX.Element => {
    return (
        <div className={styles.label}>
            Я даю согласие на обработку своих персональных данных в соответсвии с
            <Link href='/privacy'>
                <a> Политикой в отношении обработки персональных данных.</a>
            </Link>
        </div>
    );
};
