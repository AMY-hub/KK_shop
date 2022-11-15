import Image from 'next/image';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { getPricesWithSale } from '../../../helpers/getPricesWithSale';
import { SpecialCardProps } from './props';

import styles from './style.module.scss';

export const SpecialCard = forwardRef(({ name, nameRus, price, img, sale, type, size = 'l', className, ...props }: SpecialCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const [salePrice] = getPricesWithSale(price, sale?.discount);

    return (
        <div
            className={cn(styles.card, styles[type], styles[size], className)}
            {...props}
            ref={ref}>
            <Image
                src={'http://localhost:8080/' + img}
                alt={name}
                height={500}
                width={500}
                layout='intrinsic'
                loading='lazy'
            />
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
