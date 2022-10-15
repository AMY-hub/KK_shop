import Image from 'next/image';
import logo from '../../assets/images/logo.png';
import { Container } from '../../components';
import { NavBar } from '../NavBar';
import { UserControls } from '../UserControls';
import styles from './style.module.scss';

export const Header = (): JSX.Element => {

    const currentCity = 'Санкт-Петербург'; //REDUX INF

    return (
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <Container className={styles.headerTopContainer}>
                    <span className={styles.headerTopCity}>
                        {currentCity}
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
                    <Image
                        src={logo}
                        alt='logo'
                        width={124}
                        height={38}
                        layout='fixed'
                    />
                    <NavBar />
                    <UserControls />
                </Container>
            </div>
        </header >
    );
};
