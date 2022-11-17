import { observer } from 'mobx-react-lite';
import { AlertMessage, Button } from '../../../../components';
import { useBasketContext, useUserContext } from '../../../../context/AppContext';
import ArrowIcon from '../../../../assets/images/icons/round_arr.svg';

import styles from './style.module.scss';
import { FormEvent, useRef, useState } from 'react';

export const BasketFooter = observer((): JSX.Element => {

    const basketStore = useBasketContext();
    const user = useUserContext().user;
    const [message, setMessage] = useState<string>('');

    const bonusRef = useRef<HTMLInputElement>(null);
    const promoRef = useRef<HTMLInputElement>(null);

    const handleBonus = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user && bonusRef.current) {
            const bonusSum = parseInt(bonusRef.current.value.trim());
            if (bonusSum > user.bonus_card.points) {
                setMessage('У вас недостаточно баллов');
            } else {
                setMessage('');
                basketStore.setBonusDiscount(bonusSum);
                bonusRef.current.value = '';
            }
        }
    };

    const handlePromo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const promo = promoRef.current?.value.trim();
        if (!promo) {
            setMessage('Некорректные данные');
        } else {
            const result = await basketStore.setPromoDiscount(promo);
            if (result) {
                setMessage(result);
            }
        }
    };

    return (
        <>
            <div className={styles.footer}>
                <div className={styles.footerFields}>
                    {user &&
                        <>
                            <div className={styles.footerBonus}>
                                Доступно бонусов
                                <span>{user.bonus_card.points - basketStore.bonusDiscount}</span>
                            </div>
                            <form
                                onSubmit={handleBonus}
                                className={styles.footerField}>
                                <input
                                    ref={bonusRef}
                                    placeholder='Введите сумму' />
                                <button type='submit'>
                                    <ArrowIcon widht={24} height={24} />
                                </button>
                            </form>
                        </>
                    }
                    <form
                        onSubmit={handlePromo}
                        className={styles.footerField}>
                        <input ref={promoRef} placeholder='Введите промокод' />
                        <button type='submit'>
                            <ArrowIcon widht={24} height={24} />
                        </button>
                    </form>
                    {message &&
                        <div className={styles.footerMessage}>
                            {message}
                        </div>}
                </div>

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
                    href='/newOrder'
                    size='l'>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
});
