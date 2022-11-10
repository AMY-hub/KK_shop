import cn from 'classnames';
import Image from 'next/image';
import logo from '../../assets/images/logo.png'
import { ContactsProps } from './props';

import styles from './style.module.scss';

export const Contacts = ({ className, ...props }: ContactsProps): JSX.Element => {
    return (
        <div className={cn(styles.contacts, className)} {...props}>
            <Image
                src={logo}
                layout='fixed'
                width={195}
                height={60}
            />
            <a href='tel:84952592500'>8 495 259 25 00</a>
            <a href='mailto:Sale@kkshop.ru'>Sale@kkshop.ru</a>
            <span>Москва, ул. Шаболовка, д. 34, стр. 7</span>
        </div>
    );
};
