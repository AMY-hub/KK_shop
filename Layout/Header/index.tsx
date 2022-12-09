import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAppContext } from '../../context/AppContext';
import { Container, Modal, CityPicker } from '../../components';
import { NavBar } from '../NavBar';
import { UserControls } from '../UserControls';
import logo from '../../assets/images/logo.png';
import PickIcon from '../../assets/images/icons/arr-exp.svg';
import { HeaderProps } from './props';

import styles from './style.module.scss';

export const Header = observer(({ catalog }: HeaderProps): JSX.Element => {

    const ref = useRef<HTMLDivElement>(null);
    const [catalogOpen, setCatalogOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [modalShown, setModalShown] = useState<boolean>(false);
    useClickOutside(ref, () => setCatalogOpen(false));

    const { city } = useAppContext();

    useEffect(() => {
        if (!Cookies.get('preferCity')) {
            setModalShown(true);
        }
    }, []);

    useEffect(() => {
        if (catalogOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [catalogOpen]);

    return (
        <div className={cn(styles.overlay, {
            [styles.overlay_visible]: catalogOpen
        })}>
            <header className={styles.header} ref={ref} id='header'>
                <div className={styles.headerTop}>
                    <Container className={styles.headerTopContainer}>
                        <span className={styles.headerTopCity}>
                            {city}
                            <button
                                onClick={() => setModalShown(true)}
                                aria-label='Изменить город'
                                className={styles.headerTopPick}>
                                <PickIcon aria-hidden={true} />
                            </button>
                        </span>
                        <a className={styles.headerTopTel}
                            href="tel:84952592500">
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
                                alt='Логотип магазина'
                                width={124}
                                height={38}
                            />
                        </Link>
                        <NavBar
                            catalog={catalog}
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            catalogOpen={catalogOpen}
                            setCatalogOpen={setCatalogOpen}
                            className={styles.headerBodyNav} />
                        <UserControls className={styles.headerBodyControls} />
                    </Container>
                </div>
            </header >
            <Modal
                shown={modalShown}
                onClose={() => setModalShown(false)}>
                <CityPicker
                    defaultCity={city}
                    onSelect={() => setModalShown(false)} />
            </Modal>
        </div>
    );
});
