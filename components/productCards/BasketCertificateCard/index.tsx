import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { AmountControls } from '../..';
import { BasketCertificateProps } from './props';

import styles from './style.module.scss';

export const BasketCertificateCard = forwardRef(({ certificateData, amount, className, ...props }: BasketCertificateProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const { id, name, price, img } = certificateData;

    return (
        <div className={cn(styles.card, className)} {...props} ref={ref}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardImg}>
                    <Image
                        className={styles.cardImg}
                        src={process.env.NEXT_PUBLIC_DOMAIN + img}
                        alt={name}
                        height={100}
                        width={140}
                        layout='fixed'
                        loading='lazy'
                    />
                </div>

                <div className={styles.cardInfo}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>{name}</div>
                        <AmountControls
                            className={styles.cardControls}
                            initial={amount}
                            productId={id}
                            type='certificate'
                        />
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.cardPriceWrapper}>
                            <span className={styles.cardPrice}>
                                {`${price * amount} руб`}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
});

export const MBasketCertificateCard = motion(BasketCertificateCard);