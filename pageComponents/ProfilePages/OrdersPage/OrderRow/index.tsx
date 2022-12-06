import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MPreviewCard } from '../../../../components';
import { formatDateTime } from '../../../../helpers/formatDateTime';
import { OrderRowProps } from './props';

import styles from './style.module.scss';

export const OrderRow = ({ order }: OrderRowProps): JSX.Element => {

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const animationParams = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 }
    };

    const animationConfig = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
        transition: { bounce: 0 },
    };

    let cardCount = 0;

    const orderProducts = order.products.map(p => {
        cardCount += 1;

        return <MPreviewCard
            {...animationParams}
            transition={{ bounce: 0, delay: 0.07 * cardCount }}
            className={styles.rowCard}
            name={p.product.name}
            img={p.product.img}
            amount={p.amount}
            key={cardCount}
        />;
    });

    const orderCertificates = order.certificates.map(c => {
        cardCount += 1;

        return <MPreviewCard
            {...animationParams}
            transition={{ bounce: 0, delay: 0.07 * cardCount }}
            className={styles.rowCard}
            name={c.certificate.name}
            img={c.certificate.img}
            amount={c.amount}
            key={cardCount}
        />;
    });

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
                            `Скрыть детали заказа №${order.key}`
                            :
                            `Показать детали заказа №${order.key}`}
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
                                {orderCertificates}
                            </td>
                        </motion.tr>
                    </>
                }
            </AnimatePresence>
        </>
    );
};
