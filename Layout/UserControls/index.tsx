import cn from 'classnames';
import { IconButton } from '../../components';
import { UserControlsProps } from './props';
import SearchIcon from '../../assets/images/icons/search.svg';
import CartIcon from '../../assets/images/icons/cart.svg';
import HeartIcon from '../../assets/images/icons/heart.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';

import styles from './style.module.scss';
import { useBasketContext } from '../../context/AppContext';
import { observer } from 'mobx-react-lite';

export const UserControls = observer(({ className, ...props }: UserControlsProps): JSX.Element => {

    const basket = useBasketContext().basket;

    return (
        <div className={cn(styles.controls, className)} {...props}>
            <IconButton >
                <SearchIcon />
            </IconButton>
            <IconButton
                like='Link'
                href='/profile'>
                <ProfileIcon />
            </IconButton >
            <IconButton
                like='Link'
                href='/profile/favourites'>
                <HeartIcon width={24} height={24} />
            </IconButton>
            <IconButton
                className={styles.basket}
                like='Link'
                href='/basket'>
                {basket.length > 0 &&
                    <span className={styles.basketBadge}>
                        {basket.length}
                    </span>
                }
                <CartIcon />
            </IconButton>
        </div>
    );
});
