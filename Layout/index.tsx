import { FunctionComponent } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './Layout.props';

import styles from './style.module.scss';

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles.layout}>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export const WithLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return (props: T): JSX.Element => {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};
