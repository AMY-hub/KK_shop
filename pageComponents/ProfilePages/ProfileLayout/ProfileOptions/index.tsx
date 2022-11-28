import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '../../../../context/AppContext';
import { ProfileOptionsProps } from './props';

import styles from './style.module.scss';

export const ProfileOptions = ({ className, ...props }: ProfileOptionsProps): JSX.Element => {

    const store = useUserContext();
    const router = useRouter();

    const options = [
        { name: 'Моя корзина', link: '/profile/basket' },
        { name: 'Мои заказы', link: '/profile/orders' },
        { name: 'Избранное', link: '/profile/favourites' },
    ];

    return (
        <div className={cn(styles.options, className)} {...props}>
            <Link href='/profile'>
                <a className={cn({
                    [styles.active]: router.asPath === '/profile'
                })}
                >Моя карта</a>
            </Link>
            {options.map(opt => (
                <Link
                    href={opt.link}
                    key={opt.link}>
                    <a className={cn({
                        [styles.active]: router.asPath.includes(opt.link)
                    })}
                    >{opt.name}</a>
                </Link>
            ))}
            <button
                type='button'
                className={styles.exitBtn}
                onClick={() => store.logout()}>
                Выход
            </button>
        </div>
    );
};
