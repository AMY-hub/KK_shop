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

export const FavProductCard = forwardRef((props: FavProductCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const favStore = useFavContext();
    const basketStore = useBasketContext();

    const {
        productId,
        name,
        name_rus,
        price,
        img,
        discount,
        className,
        ...rest
    } = props;

    const salePrice = getPriceWithSale(price, discount);
    const productDiscount = price - salePrice;

    return (
        <div className={cn(styles.card, className)} {...rest} ref={ref}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardImg}>
                    <Link href={`/products/${productId}`}>
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
                                title=' ?????????????? ???? ????????????????????'
                                aria-label='?????????????? ???? ????????????????????'
                                onClick={() => favStore.toggleProduct(productId)}
                            >
                                <HeartIcon width={24} />
                            </IconButton>
                            <IconButton
                                title='???????????????? ?? ??????????????'
                                aria-label='???????????????? ?? ??????????????'
                                onClick={() => basketStore.addProduct(productId, 'product')}
                            >
                                <CartIcon />
                            </IconButton>
                        </div>
                        <div className={styles.cardPriceWrapper}>
                            {productDiscount > 0 ?
                                <>
                                    <span className={styles.cardPriceOld}>
                                        {`${price} ??????`}
                                    </span>
                                    <span className={styles.cardPrice}>
                                        {`${salePrice} ??????`}
                                    </span>
                                </>
                                :
                                <span className={styles.cardPrice}>
                                    {`${price} ??????`}
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