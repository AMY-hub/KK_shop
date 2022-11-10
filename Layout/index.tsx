import { useLayoutEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './Layout.props';

import styles from './style.module.scss';

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    console.log('LAYOUT RENDER');
    const [offset, setOffset] = useState(150);

    useLayoutEffect(() => {
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
            <Header />
            <main
                style={{ marginTop: `${offset}px` }}
                className={styles.layoutMain}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

// export const WithLayout = <T extends Record<string, unknown> & AppContext>(Component: FunctionComponent<T>) => {
//     return (props: T): JSX.Element => {
//         return (
//             <ContextProvider catalog={props.catalog} setCatalog={props.setCatalog}>
//                 <Layout>
//                     <Component {...props} />
//                 </Layout>
//             </ContextProvider>
//         );
//     };
// };
