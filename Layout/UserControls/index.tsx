import cn from 'classnames';
import { IconButton } from '../../components';
import { UserControlsProps } from './UserControls.props';
import SearchIcon from '../../assets/images/icons/search.svg';
import CartIcon from '../../assets/images/icons/cart.svg';
import HeartIcon from '../../assets/images/icons/heart.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';

import styles from './style.module.scss';

export const UserControls = ({ className, ...props }: UserControlsProps): JSX.Element => {

    return (
        <div className={cn(styles.controls, className)} {...props}>
            <IconButton >
                <SearchIcon />
            </IconButton>
            <IconButton
                like='Link'
                href='/profile'
            >
                <ProfileIcon />
            </IconButton >
            <IconButton
                like='Link'
                href='/profile/favourites'
            >
                <HeartIcon width={24} height={24} />
            </IconButton>
            <IconButton>
                <CartIcon />
            </IconButton>
        </div>
    );
};
