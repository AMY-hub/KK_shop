import Image from 'next/image';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { useBasketContext, useFavContext } from '../../../context/AppContext';
import Link from 'next/link';
import { getPricesWithSale } from '../../../helpers/getPricesWithSale';
import { IconButton } from '../..';
import { FavProductCardProps } from './props';
import CartIcon from '../../../assets/images/icons/cart.svg';
import HeartIcon from '../../../assets/images/icons/heart_fill.svg';

import styles from './style.module.scss';

export const FavProductCard = forwardRef(({ productData, className, ...props }: FavProductCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const favStore = useFavContext();
    const basketStore = useBasketContext();

    const {
        id,
        name,
        name_rus,
        price,
        img,
        sub_category,
        category,
        brand: { special_sale },
    } = productData;

    const [salePrice, highPrice] = getPricesWithSale(price, special_sale?.discount);

    const href = sub_category ?
        `/products/${category.route}/${sub_category.route}/${id}`
        :
        `/products/${category.route}/${id}`;

    return (
        <div className={cn(styles.card, className)} {...props} ref={ref}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardImg}>
                    <Link href={href}>
                        <Image
                            className={styles.cardImg}
                            src={process.env.NEXT_PUBLIC_DOMAIN + img}
                            alt={name}
                            height={130}
                            width={130}
                            layout='fixed'
                            loading='lazy'
                        />
                    </Link>
                </div>

                <div className={styles.cardInfo}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardDescription}>{name_rus}</div>
                        <div className={styles.cardTitle}>{name}</div>
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.cardControlsWrapper}>
                            <IconButton
                                title=' Удалить из избранного'
                                aria-label='Удалить из избранного'
                                onClick={() => favStore.toggleProduct(id)}
                            >
                                <HeartIcon width={24} />
                            </IconButton>
                            <IconButton
                                title='Добавить в корзину'
                                aria-label='Добавить в корзину'
                                onClick={() => basketStore.addProduct(id)}
                            >
                                <CartIcon />
                            </IconButton>
                        </div>
                        <div className={styles.cardPriceWrapper}>
                            <span className={styles.cardPriceOld}>
                                {`${highPrice} руб`}
                            </span>
                            <span className={styles.cardPrice}>
                                {`${salePrice} руб`}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
});
