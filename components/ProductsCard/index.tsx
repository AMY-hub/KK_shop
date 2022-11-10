import Image from 'next/image';
import cn from 'classnames';
import { ProductCardProps } from './props';

import styles from './style.module.scss';
import { InfoBadge } from '../InfoBage';
import { ForwardedRef, forwardRef } from 'react';

export const ProductCard = forwardRef(({ productData, className, ...props }: ProductCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const {
        name,
        name_rus,
        price,
        img,
        brand: { special_sale },
    } = productData;

    const finalPrice = special_sale ?
        Math.round(price * (1 - special_sale.discount / 100)) : price;

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
                <Image
                    className={styles.cardImg}
                    src={process.env.NEXT_PUBLIC_DOMAIN + img}
                    alt={name}
                    height={300}
                    width={300}
                    layout='intrinsic'
                    loading='lazy'
                />

                <div className={styles.cardInfo}>
                    <div className={styles.cardTitle}>{name}</div>
                    <div className={styles.cardDescription}>{name_rus}</div>
                    <div className={styles.cardPriceWrapper}>
                        <span className={styles.cardPrice}>
                            {`${finalPrice} руб`}
                        </span>
                        <span className={styles.cardPriceOld}>
                            {`${price * 1.2} руб`}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
});
