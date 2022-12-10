import Image from 'next/image';
import Link from 'next/link';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { AmountControls } from '../..';
import { getPriceWithSale } from '../../../helpers/getPriceWithSale';
import { BasketProductProps } from './props';

import styles from './style.module.scss';

export const BasketProductCard = forwardRef((props: BasketProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const {
        productId,
        name,
        name_rus,
        price,
        img,
        volume,
        discount,
        className,
        amount,
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
                        <AmountControls
                            className={styles.cardControls}
                            initial={amount}
                            productId={productId}
                            type='product'
                        />
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.cardVolume}>
                            {`${volume} мл`}
                        </div>
                        <div className={styles.cardPriceWrapper}>
                            {productDiscount > 0 ?
                                <>
                                    <div className={styles.cardDiscount}>
                                        {`Скидка ${productDiscount * amount} руб`}
                                    </div>
                                    <span className={styles.cardPriceOld}>
                                        {`${price * amount} руб`}
                                    </span>
                                    <span className={styles.cardPrice}>
                                        {`${salePrice * amount} руб`}
                                    </span>
                                </>
                                :
                                <span className={styles.cardPrice}>
                                    {`${price * amount} руб`}
                                </span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
});

export const MBasketProductCard = motion(BasketProductCard);