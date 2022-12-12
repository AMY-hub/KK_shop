import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { getPriceWithSale } from '../../../helpers/getPriceWithSale';
import { SpecialCardProps } from './props';

import styles from './style.module.scss';

export const SpecialCard = forwardRef((props: SpecialCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const {
        productId,
        name,
        nameRus,
        price,
        img,
        sale,
        type,
        size = 'l',
        className,
        ...rest } = props;

    const salePrice = getPriceWithSale(price, sale?.discount);

    return (
        <div
            className={cn(styles.card, styles[type], styles[size], className)}
            {...rest}
            ref={ref}>
            <Link href={`/products/${productId}`}>
                <a>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + img}
                        alt={name}
                        height={500}
                        width={500}
                        layout='intrinsic'
                        loading='lazy'
                    />
                </a>
            </Link>
            <div className={styles.cardInfo}>
                {type === 'long' ?
                    <>
                        <div className={styles.cardTitle}>{name}</div>
                        <div className={styles.cardDescription}>{nameRus}</div>
                    </>
                    :
                    <>
                        <div className={styles.cardDescription}>{nameRus}</div>
                        <div className={styles.cardTitle}>{name}</div>
                    </>
                }
                {type === 'square' &&
                    <span className={styles.cardPrice}>от {salePrice}</span>
                }
            </div>
        </div>
    );
});

export const MSpecialCard = motion(SpecialCard);
