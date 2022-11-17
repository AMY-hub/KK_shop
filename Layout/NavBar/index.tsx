import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import { Button } from '../../components';
import { navOptions } from '../const';
import { NavBarProps } from './props';
import { Category, Subcategory } from '../../interfaces';
import ExpIcon from '../../assets/images/icons/arr-exp_fill.svg';

import styles from './style.module.scss';

export const NavBar = ({ catalog, catalogOpen, setCatalogOpen, menuOpen, setMenuOpen, className, ...props }: NavBarProps): JSX.Element => {

    const router = useRouter();
    const route = router.asPath;
    const [visibleSublist, setVisibleSublist] = useState<string>('');

    const handleNav = () => {
        setCatalogOpen(false);
        setMenuOpen(false);
    };

    const buildFirstLevel = () => navOptions.map(opt => {
        if (opt.name !== 'Каталог') {
            return (
                <li
                    key={opt.url}>
                    <Button
                        like='Link'
                        href={opt.url}
                        styleType='plain'
                        size='l'
                        className={styles.navListItem}
                        onClick={handleNav}
                        isActive={route.includes(opt.url)}
                    >
                        {opt.name}
                    </Button>
                </li>
            );
        } else {
            return (
                <li key={opt.url}>
                    <Button
                        className={styles.navListItem}
                        onClick={() => setCatalogOpen(!catalogOpen)}
                        styleType='plain'
                        size='l'
                    >
                        {opt.name}
                    </Button>
                    {catalogOpen &&
                        <div className={styles.catalogListWrapper}>
                            <ul className={styles.catalogList}>
                                <Link
                                    href={`/products`}>
                                    <a
                                        className={styles.catalogListBtn}
                                        onClick={() => {
                                            handleNav();
                                            setVisibleSublist('');
                                        }}>
                                        Все товары
                                    </a>
                                </Link>
                                {buildSecondLevel()}
                            </ul>
                        </div>
                    }
                </li>
            );
        }
    });

    const buildSecondLevel = () => catalog.map(el => {
        const isSelected = route.includes(el.route);


        return (
            <li key={el.id}>
                {el.subcategories.length ?
                    <span
                        className={cn(styles.catalogListBtn, {
                            [styles.catalogListBtn_active]: isSelected
                        })}>
                        <Link href={`/products/${el.route}`}>
                            <a
                                className={cn(styles.catalogListBtn, {
                                    [styles.catalogListBtn_active]: isSelected
                                })}
                                onClick={handleNav}>
                                {el.name}
                            </a>
                        </Link>
                        <button
                            onClick={() => setVisibleSublist(el.route)}
                            className={cn(styles.catalogListExp, {
                                [styles.catalogListExp_active]: visibleSublist === el.route
                            })}>
                            <ExpIcon />
                        </button>
                    </span>
                    :
                    <Link href={`/products/${el.route}`}>
                        <a
                            className={cn(styles.catalogListBtn, {
                                [styles.catalogListBtn_active]: isSelected
                            })}
                            onClick={() => {
                                handleNav();
                                setVisibleSublist('');
                            }}>
                            {el.name}
                        </a>
                    </Link>
                }

                {visibleSublist === el.route && el.subcategories.length > 0 &&
                    <ul className={styles.catalogSubList}>
                        {buildThirdLevel(el, el.subcategories)}
                    </ul>
                }
            </li>
        );
    });

    const buildThirdLevel = (topCategory: Category, categories: Subcategory[]) => {
        return categories.map(el => {
            const isSelected = route.includes(el.route);

            return (
                <li key={el.id}>
                    <Link href={`/products/${topCategory.route}/${el.route}`}>
                        <a
                            className={cn(styles.catalogListBtn, {
                                [styles.catalogListBtn_active]: isSelected
                            })}
                            onClick={handleNav}>
                            {el.name}
                        </a>
                    </Link>
                </li>
            );
        });
    };

    return (
        <nav className={cn(styles.nav, className)} {...props}>
            <button
                className={cn(styles.burgerBtn, {
                    [styles.burgerBtn_close]: menuOpen
                })}
                onClick={() => {
                    setMenuOpen(!menuOpen);
                    setCatalogOpen(false);
                }}>
                <span></span>
            </button>
            <div className={cn(styles.navOverlay, {
                [styles.navOverlay_visible]: menuOpen
            })}>
                <ul className={styles.navList}>
                    {buildFirstLevel()}
                </ul>
            </div>
        </nav>
    );
};
