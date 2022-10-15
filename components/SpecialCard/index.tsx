import Image from 'next/image';
import cn from 'classnames';
import { SpecialCardProps } from './SpecialCard.props';

import styles from './style.module.scss';

export const SpecialCard = ({ name, nameRus, price, img, type }: SpecialCardProps): JSX.Element => {
    return (
        <div className={cn(styles.card, styles[type])}>
            <div className={styles.cardImgWrapper}>
                <Image
                    src={'http://localhost:8080/' + img}
                    alt={name}
                    layout='fill'
                    objectFit="contain"
                    loading='lazy'
                />
            </div>
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
                    <span className={styles.cardPrice}>от {price}</span>
                }
            </div>
        </div>
    );
};
