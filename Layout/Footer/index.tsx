import {
    Container,
    PaymentLogos,
    Socials,
    Contacts,
    DropdownList
} from '../../components';
import { useAppContext } from '../../context/AppContext';
import { footerInfOptions } from '../const';
import { LinkOption } from '../../interfaces';

import styles from './style.module.scss';

export const Footer = (): JSX.Element => {

    const { catalog } = useAppContext();

    const catalogLinkOptions: LinkOption[] = catalog.map(el => ({
        name: el.name,
        url: `/products/${el.route}`
    }));

    return (
        <footer className={styles.footer}>
            <Container className={styles.footerContainer}>
                <Contacts className={styles.footerContacts} />
                <DropdownList
                    title='Каталог'
                    options={[
                        { name: 'Все товары', url: `/products` },
                        ...catalogLinkOptions]}
                    className={styles.footerCatalog}
                />
                <DropdownList
                    title='Информация'
                    options={footerInfOptions}
                    className={styles.footerInfo}
                />
                <div className={styles.footerSocials} >
                    <div className={styles.footerTitle}>
                        Мы в социальных сетях
                    </div>
                    <Socials />
                </div>
                <PaymentLogos className={styles.footerPayments} />
                <div className={styles.footerCopyright}>
                    <p>ООО «Шармира»</p>
                    <p>ОГРН <span>1167746492704</span></p>
                    <p>KK Shop © Москва 2021 Все права защищены.</p>
                </div>
                <div className={styles.footerPrivacy}>
                    <p>Все торговые марки принадлежат их владельцам. Копирование составляющих частей сайта в какой бы то ни было форме без разрешения владельца авторских прав запрещено.</p>
                </div>
            </Container>
        </footer >
    );
};
