import Link from 'next/link';
import { CrumbProps } from './Crumb.props';

import styles from './style.module.scss';

export const Crumb = ({ route, text, last }: CrumbProps): JSX.Element => {

    if (last) {
        return (
            <span>{text}</span>
        );
    }

    return (
        <span className={styles.crumb}>
            <Link href={route}>
                <a>
                    {`${text}`}
                </a>
            </Link>
            <span className={styles.crumbSeparator}>/</span>
        </span>
    );
};

