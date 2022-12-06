import Image from 'next/image';
import Link from 'next/link';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { getPriceWithSale } from '../../../helpers/getPriceWithSale';
import cn from 'classnames';
import { ProductCardProps } from './props';
import { InfoBadge } from '../..';

import styles from './style.module.scss';

export const ProductCard = forwardRef(({ productData, className, ...props }: ProductCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

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
                {special_sale &&
                    <InfoBadge
                        className={styles.cardSale}
                        styleType='accent'
                        size='s'>
                        sale
                    </InfoBadge>
                }
                <Link href={`/products/${id}`}>
                    <a>
                        <Image
                            className={styles.cardImg}
                            src={process.env.NEXT_PUBLIC_DOMAIN + img}
                            alt={name}
                            height={300}
                            width={300}
                            layout='intrinsic'
                            loading='lazy'
                        />
                    </a>
                </Link>
                <div className={styles.cardInfo}>
                    <div className={styles.cardTitle}>{name}</div>
                    <div className={styles.cardDescription}>{name_rus}</div>
                    <div className={styles.cardPriceWrapper}>
                        {discount > 0 ?
                            <>
                                <span className={styles.cardPrice}>
                                    {`${salePrice} руб`}
                                </span>
                                <span className={styles.cardPriceOld}>
                                    {`${price} руб`}
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
    );
});

export const MProductCard = motion(ProductCard);