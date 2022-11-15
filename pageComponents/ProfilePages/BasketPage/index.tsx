import { observer } from 'mobx-react-lite';
import { Title, BasketProductCard } from '../../../components';
import { useBasketContext } from '../../../context/AppContext';
import { BasketFooter } from './BasketFooter';

import styles from './style.module.scss';

export const BasketPage = observer((): JSX.Element => {

    const basket = useBasketContext().getBasket();

    return (
        <div className={styles.basket}>
            {basket.length === 0 ?
                <Title tag='h2'>В корзине нет товаров.</Title>
                :
                <>
                    <div className={styles.basketList}>
                        {basket.map(el => (
                            <BasketProductCard
                                key={el.id}
                                productData={el.product}
                                amount={el.amount} />
                        ))}
                    </div>
                    <BasketFooter />
                </>
            }
        </div>
    );
});
