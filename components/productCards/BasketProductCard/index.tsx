import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import { AmountControls } from '../..';
import { getPricesWithSale } from '../../../helpers/getPricesWithSale';
import { BasketProductProps } from './props';

import styles from './style.module.scss';

export const BasketProductCard = ({ productData, amount, className, ...props }: BasketProductProps): JSX.Element => {

    const {
        id,
        name,
        name_rus,
        price,
        img,
        volume,
        sub_category,
        category,
        brand: { special_sale },
    } = productData;

    const [salePrice, highPrice] = getPricesWithSale(price, special_sale?.discount);
    const discount = highPrice - salePrice;
    const href = sub_category ?
        `/products/${category.route}/${sub_category.route}/${id}`
        :
        `/products/${category.route}/${id}`;

    return (
        <div className={cn(styles.card, className)} {...props}>
            <div className={styles.cardWrapper}>
                <div className={styles.cardImg}>
                    <Link href={href}>
                        <a>
                            <Image
                                className={styles.cardImg}
                                src={process.env.NEXT_PUBLIC_DOMAIN + img}
                                alt={name}
                                height={130}
                                width={130}
                                layout='fixed'
                                loading='lazy'
                            />
                        </a>

                    </Link>
                </div>

                <div className={styles.cardInfo}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardDescription}>{name_rus}</div>
                        <div className={styles.cardTitle}>{name}</div>
                        <AmountControls
                            className={styles.cardControls}
                            initial={amount}
                            productId={id}
                        />
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.cardVolume}>
                            {`${volume} мл`}
                        </div>
                        <div className={styles.cardPriceWrapper}>
                            {discount > 0 &&
                                <div className={styles.cardDiscount}>
                                    {`Скидка ${discount * amount} руб`}
                                </div>
                            }
                            <span className={styles.cardPriceOld}>
                                {`${highPrice * amount} руб`}
                            </span>
                            <span className={styles.cardPrice}>
                                {`${salePrice * amount} руб`}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
