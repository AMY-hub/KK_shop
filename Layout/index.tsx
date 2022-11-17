import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './props';

import styles from './style.module.scss';

export const Layout = ({ children, catalog }: LayoutProps): JSX.Element => {
    const [offset, setOffset] = useState(150);

    useEffect(() => {
        const header = document.getElementById('header');
        const resize = () => {
            if (header) {
                setOffset(header.offsetHeight + 20);
            }
        };
        if (header) {
            resize();
            window.addEventListener('resize', resize);
        }
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className={styles.layout}>
            <Header catalog={catalog} />
            <main
                style={{ marginTop: `${offset}px` }}
                className={styles.layoutMain}>
                {children}
            </main>
            <Footer catalog={catalog} />
        </div>
    );
};
