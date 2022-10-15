import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, PaymentLogos, Socials, Contacts, Title, Button } from '../../components';
import { Category } from '../../interfaces';
import { footerInfOptions } from '../const';

import styles from './style.module.scss';

export const Footer = (): JSX.Element => {

    const [catalog, setCatalog] = useState<Category[] | null>(null);

    useEffect(() => {
        axios.get<{ categories: Category[] }>(process.env.NEXT_PUBLIC_DOMAIN + 'api/category')
            .then(res => setCatalog(res.data.categories))
            .catch(err => console.log(err));
    }, []);

    const currentCity = 'Санкт-Петербург'; //REDUX INF

    const infoOptions = Array.from(footerInfOptions.keys()).map(opt => (
        <Button
            like='Link'
            href={footerInfOptions.get(opt) ?? '#'}
            styleType='plain'
            size='s'
            key={opt}
        >{opt}
        </Button>
    ));

    return (
        <footer className={styles.footer}>
            <Container className={styles.footerContainer}>
                <Contacts className={styles.footerContacts} />
                <div className={styles.footerCatalog}>
                    <Title tag='h3'>Каталог</Title>
                    {catalog &&
                        catalog.map(opt => (
                            <Button
                                like='Link'
                                href={`/products?categoryId=${opt.id}`}
                                styleType='plain'
                                size='s'
                                key={opt.id}
                            >{opt.name}
                            </Button>
                        ))}
                </div>
                <div className={styles.footerInfo}>
                    <Title tag='h3'>Информация</Title>
                    {infoOptions}
                </div>
                <div className={styles.footerSocials} >
                    <Title tag='h3'>Мы в социальных сетях</Title>
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
