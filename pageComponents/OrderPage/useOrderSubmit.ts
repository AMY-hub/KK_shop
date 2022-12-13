import { useState } from 'react';
import { SubmitHandler, UseFormReset } from 'react-hook-form';
import { OrderFormFields } from './interfaces';
import { useAppContext, useBasketContext, useUserContext } from '../../context/AppContext';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import orderService from '../../services/orderService';
import { OrderCreateResponse } from '../../interfaces';

type UseOrderSubmit = (reset: UseFormReset<OrderFormFields>, deliveryPrice: number) => {
    orderData: OrderCreateResponse | null;
    error: string;
    setError: (err: string) => void;
    submitHandler: SubmitHandler<OrderFormFields>;
};

export const useOrderSubmit: UseOrderSubmit = (reset, deliveryPrice) => {
    const [orderData, setOrderData] = useState<OrderCreateResponse | null>(null);
    const [error, setError] = useState<string>('');

    const basketStore = useBasketContext();
    const basket = basketStore.basket;
    const userState = useUserContext();
    const city = useAppContext().city;

    const validateData = (data: OrderFormFields): string | null => {
        if (!data.privacy) {
            return 'Необходимо согласие на обработку персональных данных.';
        }
        if (!data.address || !data.address.includes(city)) {
            return 'Выбран некорректный адрес. Указанный населенный пункт должен соответствовать точному адресу.';
        }
        if (data.delivery === 'курьер' && !/д \d/gm.test(data.address)) {
            return 'Выбран некорректный адрес. Укажите точный адрес, включая дом';
        }
        return null;
    };

    const submitHandler: SubmitHandler<OrderFormFields> = async (data, e) => {
        e?.preventDefault();

        try {
            const error = validateData(data);
            if (error) {
                setError(error);
                return;
            } else {
                setError('');
            }

            const products: Array<{ id: number, amount: number }> = [];
            const certificates: Array<{ id: number, amount: number }> = [];
            basket.forEach(el => {
                if (el.type === 'certificate') {
                    certificates.push({
                        id: el.certificateId,
                        amount: el.amount
                    });
                }
                if (el.type === 'product') {
                    products.push({
                        id: el.productId,
                        amount: el.amount
                    });
                }
            });

            const res = await orderService.createOrder({
                ...data,
                phone: data.phone.replace(' ', ''),
                products,
                certificates,
                userId: userState.user?.id || null,
                price: basketStore.finalPrice,
                delivery_price: deliveryPrice,
                bonus_discount: basketStore.bonusDiscount
            });

            if (res.status === 200 && res.data.orderNumber) {
                reset();
                setOrderData(res.data);
                basketStore.clearBasket();
                if (res.data.points) {
                    userState.updateBonusCard(res.data.points);
                }
            }
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return { orderData, error, setError, submitHandler };
};