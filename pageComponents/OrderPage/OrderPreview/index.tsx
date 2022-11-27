import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useMemo } from 'react';
import { DiscountsPanel, PreviewCard, Scroll } from '../../../components';
import { useBasketContext } from '../../../context/AppContext';
import { OrderPreviewProps } from './props';

import styles from './style.module.scss';

export const OrderPreview = observer(({ deliveryPrice, className, ...props }: OrderPreviewProps): JSX.Element => {

    const basketStore = useBasketContext();
    const basket = useBasketContext().basket;

    const amount = basket.reduce((prev, cur) => (cur.amount + prev), 0);

    const cards = useMemo(() => (
        basket.map(p => (<PreviewCard
            productData={p.product}
            amount={p.amount}
            key={p.id} />))
    ), [basket]);

    return (
        <div className={cn(styles.preview, className)} {...props}>
            <div className={styles.previewHeader}>
                <div>
                    <span>Ваш заказ</span>{` / ${amount} шт.`}
                </div>
                <Link href='/basket'>Изменить</Link>
            </div>

            <Scroll>
                <div className={styles.previewCards}>
                    {cards}
                </div>
            </Scroll>

            <div className={styles.previewFooter}>
                <DiscountsPanel className={styles.previewDiscount} />
                <div className={styles.previewSum}>
                    <span>Сумма заказа</span>
                    <span>{` ${basketStore.finalPrice} руб`}</span>
                </div>
                <div className={styles.previewDelivery}>
                    <span>Доставка</span>
                    <span>{
                        deliveryPrice > 0 ? `${deliveryPrice} руб`
                            : 'Бесплатно'
                    }</span>
                </div>
                <hr />
                <div className={styles.previewFinal}>
                    <span>Итого</span>
                    <br />{`${basketStore.finalPrice + deliveryPrice} руб`}
                </div>
            </div>
        </div>
    );
});
