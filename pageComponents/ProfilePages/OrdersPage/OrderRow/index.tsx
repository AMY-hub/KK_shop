import cn from 'classnames';
import { useState } from 'react';
import { PreviewCard } from '../../../../components';
import { formatDateTime } from '../../../../helpers/formatDateTime';
import { OrderRowProps } from './props';

import styles from './style.module.scss';

export const OrderRow = ({ order }: OrderRowProps): JSX.Element => {

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const orderProducts = order.products.map(p => (
        <PreviewCard
            className={styles.rowCard}
            productData={p.product}
            amount={p.amount}
            key={p.id}
        />));

    return (
        <>
            <tr className={styles.row}>
                <td>
                    <button
                        className={cn(styles.rowShowBtn, 'icon-arr-exp', {
                            [styles.rowShowBtn_active]: showDetails
                        })}
                        type='button'
                        aria-label={showDetails ?
                            'Скрыть детали заказа' : 'Показать детали заказа'}
                        onClick={() => setShowDetails(!showDetails)}>
                        {order.key}
                    </button>
                </td>
                <td>{formatDateTime(order.createdAt, 'date')}</td>
                <td>{`${order.price} руб`}</td>
                <td>{order.status}</td>
            </tr>
            {showDetails &&
                <>
                    <tr>
                        <td className={styles.rowDate} colSpan={4}>
                            {formatDateTime(order.createdAt, 'date')}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.rowPrice} colSpan={4}>
                            {`${order.price} руб`}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.rowStatus} colSpan={4}>
                            {order.status}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.rowDetails}
                            colSpan={4}>
                            {orderProducts}
                        </td>
                    </tr>
                </>
            }
        </>
    );
};
