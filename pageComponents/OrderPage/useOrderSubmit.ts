import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { SubmitHandler, UseFormReset } from 'react-hook-form';
import { OrderCreateData, OrderCreateResponse, OrderFormFields } from './interfaces';
import { ORDER } from '../../api/APIendpoints';
import { API } from '../../api/axiosConfig';
import { useAppContext, useBasketContext, useUserContext } from '../../context/AppContext';
import { getErrorMessage } from '../../helpers/getErrorMessage';

type UseOrderSubmit = (reset: UseFormReset<OrderFormFields>, deliveryPrice: number) => {
    orderNumber: string;
    error: string;
    setError: (err: string) => void;
    submitHandler: SubmitHandler<OrderFormFields>;
};

export const useOrderSubmit: UseOrderSubmit = (reset, deliveryPrice) => {
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [error, setError] = useState<string>('');

    const basketStore = useBasketContext();
    const basket = basketStore.basket;
    const userState = useUserContext();
    const city = useAppContext().city;

    const submitHandler: SubmitHandler<OrderFormFields> = async (data, e) => {
        e?.preventDefault();
        try {
            setError('');
            if (!data.address || !data.address.includes(city)) {
                setError('Выбран некорректный адрес. Указанный населенный пункт должен соответствовать точному адресу.');
                return;
            }
            if (data.delivery === 'курьер' && !/д \d/gm.test(data.address)) {
                setError('Выбран некорректный адрес. Укажите точный адрес, включая дом');
                return;
            }

            const res = await API.post<OrderCreateData, AxiosResponse<OrderCreateResponse>, OrderCreateData>(ORDER, {
                ...data,
                phone: '+7' + data.phone.replace(' ', ''),
                products: basket.map(p => ({
                    id: p.productId,
                    amount: p.amount
                })),
                userId: userState.user?.id || null,
                price: basketStore.finalPrice,
                delivery_price: deliveryPrice,
                bonus_discount: basketStore.bonusDiscount
            });

            if (res.status === 200 && res.data.orderNumber) {
                reset();
                setOrderNumber(res.data.orderNumber);
                basketStore.clearBasket();
                if (res.data.points) {
                    userState.updateBonusCard(res.data.points);
                }
            }
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return { orderNumber, error, setError, submitHandler };
};