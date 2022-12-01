import { observer } from 'mobx-react-lite';
import { BreadCrumbs, Button, Container, InfoBadge, Title } from '../../components';
import { useAppContext } from '../../context/AppContext';
import { DeliveryRules } from './DeliveryRules';
import CartLogo from '../../assets/images/icons/big_cart.svg';

import styles from './style.module.scss';

export const DeliveryPage = observer((): JSX.Element => {

    const { city } = useAppContext();

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
                    <p>Получайте товар уже на следующий день (действует на товары с пометкой).</p>
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
                        Доставка от 400 ₽
                        <span>*при заказе от 40 000 ₽ - Бесплатно</span>
                    </div>
                    <div className={styles.deliveryOptionsPick}>
                        Самовывоз
                        <span>12 магазинов</span>
                    </div>
                    <InfoBadge
                        className={styles.deliveryOptionsSum}
                        styleType='gray'
                    >
                        <CartLogo />
                        <p>
                            Добавьте товары в корзину, и мы рассчитаем точные условия доставки для вашего заказа
                        </p>
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
