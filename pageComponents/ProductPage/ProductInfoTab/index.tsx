import { useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { ProductInfoTabProps } from './props';
import { Button } from '../../../components';

import styles from './style.module.scss';

export const ProductInfoTab = (props: ProductInfoTabProps): JSX.Element => {

    const {
        name,
        volume,
        weight,
        art,
        country,
        brand,
        info,
        className,
        ...rest
    } = props;

    const [currentTab, setCurrentTab] = useState<'about' | 'brand'>('about');

    const additionalParams: Array<JSX.Element> = [];

    info.forEach(el => {
        if (el.title !== 'Описание') {
            additionalParams.push(
                <tr key={el.id}>
                    <th className={styles.paramsTableTitle}>
                        {`${el.title}:`}</th>
                    <td>{el.description}</td>
                </tr>
            );
        }
    });

    return (
        <div className={cn(styles.info, className)} {...rest}>
            <div className={styles.infoNav} role='tablist'>
                <motion.button
                    initial={{ color: "var(--gray-dark)" }}
                    animate={{
                        color: currentTab === 'about' ?
                            "var(--black)" : "var(--gray-dark)"
                    }}
                    id='about'
                    role='tab'
                    aria-selected={currentTab === 'about'}
                    className={styles.infoBtn}
                    onClick={() => setCurrentTab('about')}>
                    Описание
                    {currentTab === 'about' &&
                        <motion.span
                            className={styles.activeLine}
                            layoutId="active"></motion.span>}
                </motion.button>
                <motion.button
                    initial={{ color: "var(--gray-dark)" }}
                    animate={{
                        color: currentTab === 'brand' ?
                            "var(--black)" : "var(--gray-dark)"
                    }}
                    id='brand'
                    role='tab'
                    aria-selected={currentTab === 'brand'}
                    className={styles.infoBtn}
                    onClick={() => setCurrentTab('brand')}>
                    Бренд
                    {currentTab === 'brand' &&
                        <motion.span
                            className={styles.activeLine}
                            layoutId="active"></motion.span>}
                </motion.button>
            </div>
            {currentTab === 'about' ?
                <div className={styles.about}
                    role='tabpanel'
                    aria-labelledby='about'>
                    <span className={styles.aboutName}>
                        {name}
                    </span>
                    <span className={styles.aboutArt}>
                        {`артикул: ${art}`}
                    </span>
                    <p className={styles.aboutDescription}>
                        {info.find(el => el.title === 'Описание')?.description}
                    </p>
                    <table className={styles.paramsTable}>
                        <thead>
                            <tr>
                                <th colSpan={2}>Подробные характеристики</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className={styles.paramsTableTitle}>
                                    Вес:
                                </th>
                                <td>{`${weight} г`}</td>
                            </tr>
                            <tr>
                                <th className={styles.paramsTableTitle}>
                                    Объем:
                                </th>
                                <td>{`${volume} мл`}</td>
                            </tr>
                            <tr>
                                <th className={styles.paramsTableTitle}>
                                    Страна производитель:
                                </th>
                                <td>{country.name}</td>
                            </tr>
                            {additionalParams.length !== 0 &&
                                additionalParams}
                        </tbody>
                    </table>
                </div>
                :
                <div className={styles.brand}
                    role='tabpanel'
                    aria-labelledby='brand'>
                    <div className={styles.brandName}>
                        {brand.name}
                    </div>
                    <p className={styles.brandAbout}>
                        {brand.description}
                    </p>
                    {brand.special_sale &&
                        <p className={styles.brandSale}>
                            <span>{`${brand.special_sale.name}!`}</span>{` Скидка на все товары бренда ${brand.special_sale.discount}%!`}
                        </p>
                    }
                    <Button
                        like='Link'
                        href={`/products?brandId=${brand.id}`}
                    >
                        Другие товары бренда
                    </Button>
                </div>
            }
        </div>
    );
};
