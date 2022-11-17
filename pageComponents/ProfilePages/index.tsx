import { useUserContext } from '../../context/AppContext';
import { ProfileLayout } from './ProfileLayout';
import { observer } from 'mobx-react-lite';

import styles from './style.module.scss';

export const ProfilePage = observer((): JSX.Element => {

    const user = useUserContext().user;

    if (!user) {
        return <></>;
    }

    return (
        <ProfileLayout
            title='Мои бонусы'
            user={user}>
            <div className={styles.bonus}>
                <div className={styles.bonusCard}>
                    {`Бонусная карта № ${user.bonus_card.number}`}
                </div>
                <p className={styles.bonusPoints}>
                    На данный момент доступно
                    <span>{` ${user.bonus_card.points} `}</span>
                    бонусов.
                </p>
                <div className={styles.bonusRules}>
                    <p>
                        10% от суммы каждого заказа будет начислено на ваш бонусный счет*. Вы можете использовать бонусы для оплаты последующих заказов.
                    </p>
                    <p>1 бонус = 1 рубль.</p>
                    <p className={styles.bonusDisclaimer}>
                        * Бонусная системы не распространяется на покупку подарочных сертификатов
                    </p>
                </div>
            </div>
        </ProfileLayout>
    );
});
