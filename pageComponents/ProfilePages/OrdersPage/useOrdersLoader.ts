import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../../helpers/getErrorMessage';
import { Order } from '../../../interfaces';
import orderService from '../../../services/orderService';

type UseOrdersLoader = () => {
    orders: Order[],
    loading: boolean,
    error: string
};

export const useOrdersLoader: UseOrdersLoader = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const res = await orderService.getAllOrders();
                if (res.status === 200) {
                    setOrders(res.data);
                }
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

    return { orders, loading, error };
};