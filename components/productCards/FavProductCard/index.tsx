import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { useBasketContext, useFavContext } from '../../../context/AppContext';
import Link from 'next/link';
import { getPriceWithSale } from '../../../helpers/getPriceWithSale';
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
        brand: { special_sale },
    } = productData;

    const salePrice = getPriceWithSale(price, special_sale?.discount);
    const discount = price - salePrice;

    return (
        <div className={cn(styles.card, className)} {...props} ref={ref}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardImg}>
                    <Link href={`/products/${id}`}>
                        <a>
                            <Image
                                className={styles.cardImg}
                                src={process.env.NEXT_PUBLIC_DOMAIN + img}
                                alt={name}
                                height={130}
                                width={130}
                                layout='fixed'
                                loading='lazy'
                            />
                        </a>
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
                                onClick={() => basketStore.addProduct(id, 'product')}
                            >
                                <CartIcon />
                            </IconButton>
                        </div>
                        <div className={styles.cardPriceWrapper}>
                            {discount > 0 ?
                                <>
                                    <span className={styles.cardPriceOld}>
                                        {`${price} руб`}
                                    </span>
                                    <span className={styles.cardPrice}>
                                        {`${salePrice} руб`}
                                    </span>
                                </>
                                :
                                <span className={styles.cardPrice}>
                                    {`${price} руб`}
                                </span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
});

export const MFavProductCard = motion(FavProductCard);