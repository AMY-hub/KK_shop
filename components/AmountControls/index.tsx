import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { useBasketContext } from '../../context/AppContext';
import { AmountControlsProps } from './props';
import ClearIcon from '../../assets/images/icons/clear.svg';

import styles from './style.module.scss';

export const AmountControls = observer(({ initial, type, productId, className, ...rest }: AmountControlsProps): JSX.Element => {

    const basketStore = useBasketContext();

    const handleIncr = () => {
        if (initial < 100) {
            basketStore.updateProduct(productId, initial + 1, type);
        }
    };

    const handleDecr = () => {
        if (initial > 1) {
            basketStore.updateProduct(productId, initial - 1, type);
        }
    };

    return (
        <div className={cn(styles.controls, className)} {...rest}>
            <button
                onClick={handleDecr}
                className={styles.controlsDecr}
                aria-label='уменьнить количество'>
                -
            </button>
            <span
                className={styles.controlsAmount}
                aria-label={`количество товара ${initial} единиц`}
            >{initial}</span>
            <button
                onClick={handleIncr}
                className={styles.controlsIncr}
                aria-label='увеличить количество'>
                +
            </button>
            <button
                onClick={() => basketStore.deleteProduct(productId, type)}
                className={styles.controlsClear}
                aria-label='удалить из корзины'>
                <ClearIcon />
            </button>
        </div>
    );
});
