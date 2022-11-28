import { Title, MAlertMessage, Preloader } from '../../../components';
import { useOrdersLoader } from './useOrdersLoader';
import { OrderRow } from './OrderRow';

import styles from './style.module.scss';
import { AnimatePresence } from 'framer-motion';

export const OrdersPage = (): JSX.Element => {

    const { orders, loading, error } = useOrdersLoader();

    const orderRows = orders.map(order => (
        <OrderRow order={order} key={order.id} />
    ));

    if (loading) {
        return <Preloader />;
    }

    return (
        <div>
            {orders.length === 0 ?
                <Title tag='h2'>Список заказов пуст.</Title>
                :
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>Номер заказа</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {orderRows}
                    </tbody>
                </table>
            }
            <AnimatePresence>
                {error &&
                    <MAlertMessage
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ bounce: 0 }}
                        type='warning'
                        message={error}
                    />}
            </AnimatePresence>
        </div>
    );
};
