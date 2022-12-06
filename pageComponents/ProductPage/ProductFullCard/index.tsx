import { useRef, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useFavContext, useUserContext } from '../../../context/AppContext';
import { Title, ProductSlider, Modal, AuthTab, FavButton, BasketBtn } from '../../../components';
import { getPriceWithSale } from '../../../helpers/getPriceWithSale';
import { ProductFullCardProps } from './props';

import styles from './style.module.scss';

export const ProductFullCard = ({ productData, className, ...rest }: ProductFullCardProps): JSX.Element => {

    const [modalShown, setModalShown] = useState<boolean>(false);
    const suggestionRef = useRef<number>(0);
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
    const salePrice = getPriceWithSale(price, special_sale?.discount);
    const discount = price - salePrice;

    const handleSuggestion = () => {
        if (!userStore.isLoggedIn && !suggestionRef.current) {
            suggestionRef.current = 1;
            setModalShown(true);
        }
    };

    const handleFav = (productId: number) => {
        if (!userStore.isLoggedIn) {
            suggestionRef.current = 0;
            handleSuggestion();
            return;
        }
        favStore.toggleProduct(productId);
    };

    return (
        <div className={cn(styles.product, className)} {...rest}>
            {addImages.length === 0 ?
                <div className={styles.productImg}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + img}
                        alt={name}
                        layout='intrinsic'
                        width={550}
                        height={550}
                    />
                </div>
                :
                <ProductSlider images={[img, ...addImages]} />
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
                    {discount > 0 ?
                        <>
                            <div className={styles.infoPriceNew}>
                                <span className={styles.infoPriceNewPrice}>
                                    {`${salePrice} руб`}
                                </span>
                                <span className={styles.infoPriceNewText}>
                                    {`Со скидкой ${special_sale?.discount}%`}
                                </span>
                            </div>
                            <div className={styles.infoPriceOld}>
                                <span className={styles.infoPriceOldPrice}>
                                    {`${price} руб`}
                                </span>
                                <span className={styles.infoPriceOldText}>
                                    Без скидки
                                </span>
                            </div>
                        </>
                        :
                        <div className={styles.infoPriceNew}>
                            <span className={styles.infoPriceNewPrice}>
                                {`${salePrice} руб`}
                            </span>
                        </div>
                    }

                </div>
                <div className={styles.infoBtns}>
                    <BasketBtn
                        productId={id}
                        onClick={handleSuggestion}
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
