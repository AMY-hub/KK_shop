import { useRef, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useBasketContext, useFavContext, useUserContext } from '../../../context/AppContext';
import { Title, ProductSlider, Modal, AuthTab, FavButton, BasketBtn } from '../../../components';
import { getPricesWithSale } from '../../../helpers/getPricesWithSale';
import { ProductFullCardProps } from './props';

import styles from './style.module.scss';

export const ProductFullCard = ({ productData, className, ...rest }: ProductFullCardProps): JSX.Element => {

    const [modalShown, setModalShown] = useState<boolean>(false);
    const suggestionRef = useRef<number>(0);
    const basketStore = useBasketContext();
    const userStore = useUserContext();
    const favStore = useFavContext();

    const {
        id,
        name,
        name_rus,
        price,
        img,
        product_add_images,
        volume,
        brand: { special_sale },
        art,
    } = productData;
    const addImages = product_add_images.map(el => el.img);
    const [salePrice, highPrice] = getPricesWithSale(price, special_sale?.discount);

    const handleSuggestion = () => {
        if (suggestionRef.current) {
            return;
        }
        suggestionRef.current = 1;
        setModalShown(true);
    };

    const handleFav = (productId: number) => {
        if (!userStore.isLoggedIn) {
            suggestionRef.current = 0;
            handleSuggestion();
            return;
        }
        favStore.toggleProduct(productId);
    };

    const handleBasket = (productId: number) => {
        if (!userStore.isLoggedIn) {
            handleSuggestion();
        }
        const productInBasket = basketStore.findInBasket(productId);
        if (productInBasket) {
            basketStore.updateProduct(productId, productInBasket.amount + 1);
        } else {
            basketStore.addProduct(productId);
        }
    };

    return (
        <div className={cn(styles.product, className)} {...rest}>
            {addImages.length === 0 ?
                <div className={styles.productImg}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + img}
                        layout='intrinsic'
                        width={550}
                        height={550}
                    />
                </div>
                :
                <ProductSlider
                    images={[img, ...addImages]}
                />
            }
            <div className={styles.info}>
                <span className={styles.infoName}>
                    {name_rus}
                </span>
                <Title
                    className={styles.infoTitle}
                    tag='h1'>
                    {name}
                </Title>
                <div className={styles.infoArt}>
                    {`Артикул: ${art}`}
                </div>
                <div className={styles.infoVol}>
                    <span>
                        {volume}
                    </span>
                    объем / мл
                </div>
                <div className={styles.infoPrice}>
                    <div className={styles.infoPriceNew}>
                        <span className={styles.infoPriceNewPrice}>
                            {`${salePrice} руб`}
                        </span>
                        <span className={styles.infoPriceNewText}>
                            {`Со скидкой ${special_sale?.discount || 20}%`}
                        </span>
                    </div>
                    <div className={styles.infoPriceOld}>
                        <span className={styles.infoPriceOldPrice}>
                            {`${highPrice} руб`}
                        </span>
                        <span className={styles.infoPriceOldText}>
                            Без скидки
                        </span>
                    </div>
                </div>
                <div className={styles.infoBtns}>
                    <BasketBtn
                        productId={id}
                        onClick={handleBasket}
                    />
                    <FavButton
                        productId={id}
                        onClick={() => handleFav(id)}
                    />
                </div>
            </div>

            <Modal
                shown={modalShown}
                onClose={() => setModalShown(false)}
                title='Зарегистрируйтесь и получите 10% бонусную карту!'>
                <AuthTab onAuth={() => setModalShown(false)} />
            </Modal>
        </div>
    );
};
