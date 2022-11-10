import Image from 'next/image';
import cn from 'classnames';
import { AdvantagesBlockProps } from './props';
import deliveryImg from '../../assets/images/delivery.png';
import freeImg from '../../assets/images/delivery_free.png';
import qualityImg from '../../assets/images/quality.png';

import styles from './style.module.scss';

export const AdvantagesBlock = ({ className, ...props }: AdvantagesBlockProps): JSX.Element => {
    return (
        <div className={cn(styles.advantages, className)} {...props}>
            <div className={styles.advantagesItem}>
                <div className={styles.advantagesImg}>
                <Image
                    src={freeImg}
                    layout='fixed'
                />                    
                </div>
                <span>
                    Бесплатная
                    доставка от 1000 руб
                </span>
            </div>
            <div className={styles.advantagesItem}>
                <div className={styles.advantagesImg}>
                    <Image
                        src={deliveryImg}
                        layout='fixed'
                    />
                </div>
                <span>
                    Доставка по всей
                    территории РФ
                </span>
            </div>
            <div className={styles.advantagesItem}>
                <div className={styles.advantagesImg}>
                    <Image
                        src={qualityImg}
                        layout='fixed'
                    />
                </div>
                <span>
                    Гарантия качества
                    продукции
                </span>
            </div>
        </div>
    );
};
