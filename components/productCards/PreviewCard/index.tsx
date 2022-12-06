import Image from 'next/image';
import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { PreviewCardProps } from './props';

import styles from './style.module.scss';

export const PreviewCard = forwardRef(({ img, name, amount, className, ...props }: PreviewCardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

    return (
        <div
            className={cn(styles.card, className)}
            {...props}
            ref={ref}>
            <div className={styles.cardImg}>
                <Image
                    src={process.env.NEXT_PUBLIC_DOMAIN + img}
                    alt={name}
                    layout='fixed'
                    width={80}
                    height={80} />
            </div>
            <div className={styles.cardText}>
                <div className={styles.cardName}>{name}</div>
                <div className={styles.cardAmount}>
                    {`Количество: ${amount}`}
                </div>
            </div>
        </div>
    );
});

export const MPreviewCard = motion(PreviewCard);