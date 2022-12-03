import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { BreadCrumbs, Button, Container, Dropdown, InfoBadge, Title } from '../../components';
import { useAppContext, useBasketContext } from '../../context/AppContext';
import { DeliveryRules } from './DeliveryRules';
import { formatNumName } from '../../helpers/formatNumName';
import { useDelivery } from '../../hooks/useDelivery';
import CartLogo from '../../assets/images/icons/big_cart.svg';
import { DeliveryPageProps } from './props';

import styles from './style.module.scss';

export const DeliveryPage = observer(({ addresses }: DeliveryPageProps): JSX.Element => {

    const city = useAppContext().city;
    const basket = useBasketContext().basket;
    const { courierPrice, deliveryPrice, pick } = useDelivery(addresses);

    return (
        <Container className={styles.delivery}>
            <BreadCrumbs />
            <Title tag='h1'>Доставка и Оплата</Title>

            <section className={styles.deliveryAdvantages}>
                <InfoBadge
                    styleType='gray'
                    className={styles.deliveryAdvantagesBadge}>
                    <div className={styles.deliveryAdvantagesTitle}>
                        Пункты выдачи
                    </div>
                    <p>Выбирайте наиболее удобный для вас пункт выдачи и дату получения заказа.</p>
                </InfoBadge>
                <InfoBadge
                    styleType='gray'
                    className={styles.deliveryAdvantagesBadge}>
                    <div className={styles.deliveryAdvantagesTitle}>
                        Экспресс-доставка
                    </div>
                    <p>Получайте товар уже на следующий день (действует в Москве и Санкт-Петербурге).</p>
                </InfoBadge>
                <InfoBadge
                    styleType='gray'
                    className={styles.deliveryAdvantagesBadge}>
                    <div className={styles.deliveryAdvantagesTitle}>
                        Профессионально и безопасно
                    </div>
                    <p>Мы серьёзно относимся к процессу доставки и доверяем её только профессионалам своего дела.</p>
                </InfoBadge>
            </section>

            <section className={styles.deliveryOptions}>
                <div className={styles.deliveryOptionsInfo}>
                    <Title
                        tag='h2'
                        className={styles.deliveryOptionsTitle}
                    >{`Варианты доставки в ${city}`}
                    </Title>
                    <div className={styles.deliveryOptionsPrice}>
                        {`Доставка от ${courierPrice} ₽`}
                        <span>*при заказе от 5 000 ₽ - Бесплатно</span>
                    </div>
                    <div className={styles.deliveryOptionsPick}>
                        Самовывоз
                        {pick ?
                            <Dropdown header={
                                <span className={styles.pick}>
                                    {formatNumName(pick.length, ['магазин', 'магазина', 'магазинов'])}
                                </span>}>
                                <ul className={styles.pickList}>
                                    {pick.map(p => (
                                        <li key={p.id}>{p.address}</li>
                                    ))}
                                </ul>
                            </Dropdown>
                            :
                            <span className={styles.pick}>
                                самовывоз недоступен в вашем регионе
                            </span>
                        }
                    </div>
                    <InfoBadge
                        className={styles.deliveryOptionsSum}
                        styleType='gray'>
                        <Link href='/basket'>
                            <a>
                                <CartLogo aria-hidden={true} />
                                <span className={styles.hidden}>
                                    Перейти к корзине
                                </span>
                            </a>
                        </Link>

                        {basket.length === 0 ?
                            <p>
                                Добавьте товары в корзину, и мы рассчитаем точные условия доставки для вашего заказа
                            </p>
                            :
                            <p>
                                {`Доставка для вашей корзины: 
                                ${deliveryPrice > 0 ?
                                        `${deliveryPrice} ₽` : 'Бесплатно'}`}
                            </p>
                        }
                    </InfoBadge>
                    <Button
                        className={styles.deliveryOptionsBtn}
                        like='Link'
                        href='/products'
                        size='l'
                        isWide
                    >
                        Перейти в каталог
                    </Button>
                </div>
                <div className={styles.deliveryOptionsImg}></div>
            </section>

            <DeliveryRules />
        </Container>
    );
});
