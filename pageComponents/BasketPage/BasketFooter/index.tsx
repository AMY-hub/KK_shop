import { observer } from 'mobx-react-lite';
import { Button, DiscountsPanel } from '../../../components';
import { useBasketContext } from '../../../context/AppContext';

import styles from './style.module.scss';

export const BasketFooter = observer((): JSX.Element => {

    const basketStore = useBasketContext();

    return (
        <>
            <div className={styles.footer}>
                <DiscountsPanel />

                <div className={styles.footerPrice}>
                    {basketStore.finalDiscount > 0 &&
                        <div className={styles.footerDiscount}>
                            <span>Скидка</span>
                            <br />
                            {`-${basketStore.finalDiscount}`}
                        </div>
                    }
                    <div>
                        <span>К оплате</span>
                        <br />
                        {basketStore.finalPrice}
                    </div>
                </div>

            </div>

            <div className={styles.footerOrder}>
                <Button
                    like='Link'
                    href='/order'
                    size='l'>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
});
