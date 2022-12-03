import { observer } from 'mobx-react-lite';
import { IconButton } from '..';
import { useFavContext } from '../../context/AppContext';
import { FavButtonProps } from './props';
import FavIcon from '../../assets/images/icons/heart.svg';
import FillFavIcon from '../../assets/images/icons/heart_fill.svg';

import styles from './style.module.scss';

export const FavButton = observer(({ productId, onClick }: FavButtonProps): JSX.Element => {
    const favStore = useFavContext();
    const isFav = favStore.isProductFav(productId);

    return (
        <IconButton
            aria-label={isFav ?
                'Удалить из избранного' : 'Добавить в избранное'}
            title={isFav ?
                'Удалить из избранного' : 'Добавить в избранное'}
            onClick={() => onClick(productId)}
            className={styles.favBtn}
            styleType='dark'>
            {isFav ?
                <FillFavIcon width={24} height={24} /> :
                <FavIcon width={24} height={24} />
            }
        </IconButton>
    );
});
