import Image from 'next/image';
import cn from 'classnames';
import { PreviewCardProps } from './props';

import styles from './style.module.scss';

export const PreviewCard = ({ productData, amount, className, ...props }: PreviewCardProps): JSX.Element => {

    return (
        <div
            className={cn(styles.card, className)}
            {...props}>
            <div className={styles.cardImg}>
                <Image
                    src={process.env.NEXT_PUBLIC_DOMAIN + productData.img}
                    layout='fixed'
                    width={80}
                    height={80} />
            </div>
            <div className={styles.cardText}>
                <div className={styles.cardName}>{productData.name}</div>
                <div className={styles.cardAmount}>
                    {`Количество: ${amount}`}
                </div>
            </div>
        </div>
    );
};
