import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Title, MBasketProductCard, Preloader } from '../../components';
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

    return (
        <div className={styles.basket}>
            {basket.length === 0 ?
                <Title tag='h2'>В корзине нет товаров.</Title>
                :
                <>
                    <div className={styles.basketList}>
                        <AnimatePresence initial={false}>
                            {basket.map(el => (
                                <MBasketProductCard
                                    {...animationConfig}
                                    key={el.id}
                                    productData={el.product}
                                    amount={el.amount} />
                            ))}
                        </AnimatePresence>
                    </div>
                    <BasketFooter />
                </>
            }
        </div>
    );
});
