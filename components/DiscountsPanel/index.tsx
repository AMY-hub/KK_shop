import { FormEvent, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { useBasketContext, useUserContext } from '../../context/AppContext';
import { InputForm } from '..';
import { DiscountsPanelProps } from './props';

import styles from './style.module.scss';
import { formatNumName } from '../../helpers/formatNumName';

export const DiscountsPanel = observer(({ className, ...rest }: DiscountsPanelProps): JSX.Element => {

    const basketStore = useBasketContext();
    const user = useUserContext().user;
    const [message, setMessage] = useState<string>('');

    const bonusRef = useRef<HTMLInputElement>(null);
    const promoRef = useRef<HTMLInputElement>(null);

    const handleBonus = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user && bonusRef.current) {
            const bonusSum = parseInt(bonusRef.current.value.trim());
            if (bonusSum) {
                if (bonusSum <= user.bonus_card.points) {
                    setMessage('');
                    basketStore.setBonusDiscount(bonusSum);
                } else {
                    setMessage('У вас недостаточно баллов');
                }
            }
        }
    };

    const handlePromo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const promo = promoRef.current?.value.trim();
        if (promo) {
            const result = await basketStore.setPromoDiscount(promo);
            if (result) {
                setMessage(result);
            }
        } else {
            setMessage('Некорректные данные');
        }
    };

    return (
        <div className={cn(styles.discounts, className)} {...rest}>
            {user &&
                <>
                    <div className={styles.discountsBonus}>
                        Доступно бонусов
                        <span>{user.bonus_card.points - basketStore.bonusDiscount}</span>
                    </div>
                    <InputForm
                        ref={bonusRef}
                        onSubmit={handleBonus}
                        className={styles.discountsField}
                        placeholder='Введите сумму' />
                </>
            }
            <InputForm
                ref={promoRef}
                onSubmit={handlePromo}
                className={styles.discountsField}
                placeholder='Введите промокод' />

            <div className={styles.discountsMessage}>
                {basketStore.bonusDiscount > 0 &&
                    <div>
                        {`- ${formatNumName(basketStore.bonusDiscount, ['бонус', 'бонуса', 'бонусов'])}`}
                    </div>}
                {message &&
                    <div>{message}</div>}
            </div>
        </div>
    );
});
