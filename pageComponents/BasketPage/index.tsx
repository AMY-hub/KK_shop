import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Title, MBasketProductCard, Preloader, BasketCertificateCard } from '../../components';
import { useBasketContext } from '../../context/AppContext';
import { BasketFooter } from './BasketFooter';

import styles from './style.module.scss';

export const BasketPage = observer((): JSX.Element => {
    const basket = useBasketContext().basket;
    const basketStatus = useBasketContext().status;

    if (typeof window === 'undefined' || basketStatus === 'loading') {
        return <Preloader />;
    }

    const animationConfig = {
        initial: { opacity: 0, x: -500 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -500 },
        transition: { bounce: 0 },
    };
    let cardsCounter = 0;

    const cards = basket.map(el => {
        cardsCounter += 1;
        return el.type === 'product' ?
            <MBasketProductCard
                {...animationConfig}
                key={cardsCounter}
                productId={el.product.id}
                name={el.product.name}
                name_rus={el.product.name_rus}
                img={el.product.img}
                price={el.product.price}
                volume={el.product.volume}
                discount={el.product.brand.special_sale?.discount}
                amount={el.amount} />
            :
            <BasketCertificateCard
                key={cardsCounter}
                certificateData={el.certificate}
                amount={el.amount}
            />;
    });

    return (
        <div className={styles.basket}>
            {basket.length === 0 ?
                <Title tag='h2'>В корзине нет товаров.</Title>
                :
                <>
                    <div className={styles.basketList}>
                        <AnimatePresence initial={false}>
                            {cards}
                        </AnimatePresence>
                    </div>
                    <BasketFooter />
                </>
            }
        </div>
    );
});
