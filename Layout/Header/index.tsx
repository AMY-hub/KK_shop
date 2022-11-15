import Link from 'next/link';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAppContext } from '../../context/AppContext';
import { Container } from '../../components';
import { NavBar } from '../NavBar';
import { UserControls } from '../UserControls';
import logo from '../../assets/images/logo.png';

import styles from './style.module.scss';

export const Header = (): JSX.Element => {

    const ref = useRef<HTMLDivElement>(null);
    const [catalogOpen, setCatalogOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    useClickOutside(ref, () => setCatalogOpen(false));

    const { city } = useAppContext();

    return (
        <div className={cn(styles.overlay, {
            [styles.overlay_visible]: catalogOpen
        })}>
            <header className={styles.header} ref={ref} id='header'>
                <div className={styles.headerTop}>
                    <Container className={styles.headerTopContainer}>
                        <span className={styles.headerTopCity}>
                            {city}
                        </span>
                        <a className={styles.headerTopTel}
                            href="tel:84952592500"
                        >
                            8 495 259 25 00
                        </a>
                    </Container>
                </div>

                <div className={styles.headerBody}>
                    <Container className={styles.headerBodyContainer}>
                        <Link href='/'>
                            <img
                                className={styles.headerBodyLogo}
                                src={logo.src}
                                alt='logo'
                                width={124}
                                height={38}
                            />
                        </Link>
                        <NavBar
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            catalogOpen={catalogOpen}
                            setCatalogOpen={setCatalogOpen}
                            className={styles.headerBodyNav} />
                        <UserControls className={styles.headerBodyControls} />
                    </Container>
                </div>
            </header >
        </div>

    );
};
