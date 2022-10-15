import { useRouter } from 'next/router';
import { Button } from '../../components';
import { navOtionsMap } from '../const';

import styles from './style.module.scss';

export const NavBar = (): JSX.Element => {

    const router = useRouter();

    const Links = Array.from(navOtionsMap.keys()).map(opt => {
        const path = navOtionsMap.get(opt) ?? '#';
        return (
            <Button
                like='Link'
                href={path}
                styleType='plain'
                size='l'
                isActive={router.pathname.includes(path)}
                key={path}
            >
                {opt}
            </Button>
        );
    });

    return (
        <nav className={styles.nav}>
            {Links}
        </nav>
    );
};
