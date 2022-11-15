import { observer } from 'mobx-react-lite';
import { Button } from '..';
import { useBasketContext } from '../../context/AppContext';
import { BasketBtnProps } from './props';

import styles from './style.module.scss';

export const BasketBtn = observer(({ productId, onClick }: BasketBtnProps): JSX.Element => {
    const productInBasket = useBasketContext().findInBasket(productId);

    return (
        <Button
            className={productInBasket? styles.add : ''}
            onClick={() => onClick(productId)}>
            {productInBasket ?
                "В корзине"
                :
                "Добавить в корзину"}
        </Button>
    );
});
