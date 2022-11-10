import { useRef, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { Button, IconButton, Title, ProductSlider, Modal, AuthTab } from '../../../components';
import { ProductFullCardProps } from './props';
import FavIcon from '../../../assets/images/icons/heart.svg';

import styles from './style.module.scss';

export const ProductFullCard = (props: ProductFullCardProps): JSX.Element => {

    const [modalShown, setModalShown] = useState<boolean>(false);
    const suggestionRef = useRef<number>(0);

    const {
        name,
        nameRus,
        img,
        addImages,
        volume,
        price,
        discount,
        art,
        className,
        ...rest
    } = props;

    const finalPrice = discount ?
        Math.round(price * (1 - discount / 100)) : price;

    const handleSuggestion = () => {
        if (!suggestionRef.current) {
            suggestionRef.current = 1;
            setModalShown(true);
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
                    {nameRus}
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
                            {`${finalPrice} руб`}
                        </span>
                        <span className={styles.infoPriceNewText}>
                            {`Со скидкой ${discount || 20}%`}
                        </span>
                    </div>
                    <div className={styles.infoPriceOld}>
                        <span className={styles.infoPriceOldPrice}>
                            {`${price * 1.2} руб`}
                        </span>
                        <span className={styles.infoPriceOldText}>
                            Без скидки
                        </span>
                    </div>
                </div>
                <div className={styles.infoBtns}>
                    <Button onClick={handleSuggestion}>
                        Добавить в корзину
                    </Button>
                    <IconButton
                        onClick={handleSuggestion}
                        className={styles.infoFavBtn}
                        styleType='dark'>
                        <FavIcon width={24} height={24} />
                    </IconButton>
                </div>
            </div>

            <Modal
                shown={modalShown}
                onClose={() => setModalShown(false)}
                title='Зарегистрируйтесь и получите 10% бонусную карту!'
            >
                <AuthTab />
            </Modal>
        </div>
    );
};
