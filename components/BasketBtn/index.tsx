import { observer } from 'mobx-react-lite';
import { Button } from '..';
import { useBasketContext } from '../../context/AppContext';
import { BasketBtnProps } from './props';

import styles from './style.module.scss';

export const BasketBtn = observer(({ productId, productType = 'product', onClick }: BasketBtnProps): JSX.Element => {

    const basketStore = useBasketContext();
    const productInBasket = basketStore.findInBasket(productId, productType);

    const handleAdd = () => {
        if (productInBasket) {
            basketStore.updateProduct(productId, productInBasket.amount + 1, productType);
        } else {
            basketStore.addProduct(productId, productType);
        }
        if (onClick) {
            onClick();
        }
    };


    return (
        <Button
            className={productInBasket ? styles.add : ''}
            onClick={handleAdd}>
            {productInBasket ?
                "В корзине"
                :
                "Добавить в корзину"}
        </Button>
    );
});
