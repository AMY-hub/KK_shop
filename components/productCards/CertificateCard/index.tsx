import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BasketBtn } from '../..';
import { CertificateCardProps } from './props';

import styles from './style.module.scss';

export const CertificateCard = forwardRef(({ certificateData }: CertificateCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    const { id, name, price, img } = certificateData;

    return (
        <div className={styles.card} ref={ref}>
            <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + img}
                alt={name}
                width={400}
                height={300}
                layout='intrinsic'
                loading='lazy'
            />
            <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>{name}</div>
                <div className={styles.cardPriceWrapper}>
                    <span className={styles.cardPrice}>
                        {`${price} руб`}
                    </span>
                    <BasketBtn
                        productId={id}
                        productType='certificate' />
                </div>
            </div>
        </div>
    );
});

export const MCertificateCard = motion(CertificateCard);