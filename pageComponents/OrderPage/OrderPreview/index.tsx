import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { DiscountsPanel, PreviewCard, Scroll } from '../../../components';
import { useBasketContext } from '../../../context/AppContext';
import { OrderPreviewProps } from './props';

import styles from './style.module.scss';

export const OrderPreview = observer(({ deliveryPrice, pickPrice, deliveryType, className, ...props }: OrderPreviewProps): JSX.Element => {

    const basketStore = useBasketContext();
    const basket = useBasketContext().basket;
    const delivery = deliveryType === 'курьер' ? deliveryPrice : pickPrice;

    const cards = basket.map(p => (<PreviewCard
        name={p.type === 'certificate' ? p.certificate.name : p.product.name}
        img={p.type === 'certificate' ? p.certificate.img : p.product.img}
        amount={p.amount}
        key={p.id} />));

    const amount = basket.reduce((prev, cur) => (cur.amount + prev), 0);

    return (
        <div className={cn(styles.preview, className)} {...props}>
            <div className={styles.previewHeader}>
                <div>
                    <span>Ваш заказ</span>{` / ${amount} шт.`}
                </div>
                <Link href='/basket'>Изменить</Link>
            </div>

            <Scroll width={4}>
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
                    <span>
                        {delivery > 0 ? `${delivery} руб.` : 'Бесплатно'}
                    </span>
                </div>
                <hr />
                <div className={styles.previewFinal}>
                    <span>Итого</span>
                    <br />{`${basketStore.finalPrice + delivery} руб`}
                </div>
            </div>
        </div>
    );
});
