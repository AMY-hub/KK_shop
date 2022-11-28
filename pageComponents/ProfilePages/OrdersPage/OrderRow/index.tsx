import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MPreviewCard } from '../../../../components';
import { formatDateTime } from '../../../../helpers/formatDateTime';
import { OrderRowProps } from './props';

import styles from './style.module.scss';

export const OrderRow = ({ order }: OrderRowProps): JSX.Element => {

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const animationConfig = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
        transition: { bounce: 0 },
    };

    const orderProducts = order.products.map((p, idx) => (
        <MPreviewCard
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ bounce: 0, delay: 0.07 * idx }}
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
            <AnimatePresence>
                {showDetails &&
                    <>
                        <motion.tr {...animationConfig}>
                            <td className={styles.rowDate} colSpan={4}>
                                {formatDateTime(order.createdAt, 'date')}
                            </td>
                        </motion.tr>
                        <motion.tr {...animationConfig}>
                            <td className={styles.rowPrice} colSpan={4}>
                                {`${order.price} руб`}
                            </td>
                        </motion.tr>
                        <motion.tr {...animationConfig}>
                            <td className={styles.rowStatus} colSpan={4}>
                                {order.status}
                            </td>
                        </motion.tr>
                        <motion.tr {...animationConfig}>
                            <td className={styles.rowDetails}
                                colSpan={4}>
                                {orderProducts}
                            </td>
                        </motion.tr>
                    </>
                }
            </AnimatePresence>
        </>
    );
};
