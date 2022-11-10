import Image from 'next/image';
import { Button } from '..';
import { CertificateCardProps } from './props';

import styles from './style.module.scss';

export const CertificateCard = ({ name, price, img }: CertificateCardProps): JSX.Element => {

    return (
        <div className={styles.card}>
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
                    <Button
                        className={styles.cardBuy}
                    >
                        В корзину
                    </Button>
                </div>
            </div>
        </div>
    );
};
