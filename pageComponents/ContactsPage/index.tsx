import Image from 'next/image';
import cn from 'classnames';
import { BreadCrumbs, Container } from '../../components';

import styles from './style.module.scss';

export const ContactsPage = (): JSX.Element => {
    return (
        <Container>
            <BreadCrumbs />
            Contacts
        </Container>
    );
};
