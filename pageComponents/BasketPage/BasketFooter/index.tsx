import { observer } from 'mobx-react-lite';
import { AlertMessage, Button, DiscountsPanel } from '../../../components';
import { useBasketContext } from '../../../context/AppContext';

import styles from './style.module.scss';

export const BasketFooter = observer((): JSX.Element => {

    const basketStore = useBasketContext();

    return (
        <>
            <div className={styles.footer}>
                <DiscountsPanel />

                <div className={styles.footerPrice}>
                    <div className={styles.footerDiscount}>
                        <span>Скидка</span>
                        <br />
                        {`-${basketStore.finalDiscount}`}
                    </div>
                    <div>
                        <span>К оплате</span>
                        <br />
                        {basketStore.finalPrice}
                    </div>
                </div>

            </div>

            {basketStore.error &&
                <AlertMessage
                    message={basketStore.error}
                    type='warning'
                    onClose={() => basketStore.error = ''}
                />}

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
