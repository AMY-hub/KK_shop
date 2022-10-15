import Image from 'next/image';
import { ProductCardProps } from './ProductCard.props';

import styles from './style.module.scss';

export const ProductCard = ({ name, nameRus, price, oldPrice, img }: ProductCardProps): JSX.Element => {

    return (
        <div className={styles.card}>
            <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + img}
                alt={name}
                height={250}
                width={250}
                layout='intrinsic'
                loading='lazy'
            />
            <div className={styles.cardInfo}>
                <div>
                    <div className={styles.cardTitle}>{name}</div>
                    <span className={styles.cardDescription}>{nameRus}</span>
                </div>

                <div className={styles.cardPriceWrapper}>
                    <span className={styles.cardPrice}>{price}</span>
                    <span className={styles.cardPriceOld}>{oldPrice}</span>
                </div>
            </div>
        </div>
    );
};
