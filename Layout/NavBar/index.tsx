import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { useMathMedia } from '../../hooks/useMathMedia';
import { Button } from '../../components';
import { navOptions } from '../const';
import { NavBarProps } from './props';
import { Category, Subcategory } from '../../interfaces';

import styles from './style.module.scss';

export const NavBar = ({ catalog, catalogOpen, setCatalogOpen, menuOpen, setMenuOpen, className, ...props }: NavBarProps): JSX.Element => {

    const router = useRouter();
    const [visibleSublist, setVisibleSublist] = useState<string>('');
    const isMobile = useMathMedia('(max-width: 860px)');

    useEffect(() => {
        if (!router.pathname.includes('products')
            || !router.query.categoryId) {
            setVisibleSublist('');
        }
    }, [router.pathname, router.query.categoryId]);

    const handleNav = () => {
        setCatalogOpen(false);
        setMenuOpen(false);
    };

    const animationConfigX = {
        initial: { opacity: 0, x: -500 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -500 },
        transition: { bounce: 0 },
    };

    const animationConfigY = {
        initial: {
            opacity: 0,
            height: 0,
            paddingBottom: 0,
            paddingTop: 0
        },
        animate: {
            opacity: 1,
            height: 'auto',
            paddingBottom: 15,
            paddingTop: 15
        },
        exit: {
            opacity: 0,
            height: 0,
            paddingBottom: 0,
            paddingTop: 0
        },
        transition: { bounce: 0 },
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
                        isActive={router.pathname.includes(opt.url)}
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
                    <AnimatePresence>
                        {catalogOpen &&
                            <motion.div
                                {...animationConfigY}
                                className={styles.catalogListWrapper}>
                                <ul className={styles.catalogList}>
                                    <Link href={`/products`}>
                                        <a className={styles.catalogListBtn}
                                            onClick={() => {
                                                handleNav();
                                                setVisibleSublist('');
                                            }}>
                                            Все товары
                                        </a>
                                    </Link>
                                    {buildSecondLevel()}
                                </ul>
                            </motion.div>}
                    </AnimatePresence>
                </li>
            );
        }
    });

    const buildSecondLevel = () => catalog.map(el => {
        const isSelected = router.query?.categoryId == String(el.id);
        return (
            <li key={el.id}>
                {el.subcategories.length ?
                    <button
                        onClick={() => setVisibleSublist(el.route)}
                        className={cn(styles.catalogListBtn, 'icon-arr-exp_fill', {
                            [styles.catalogListBtn_active]: isSelected,
                            [styles.catalogListBtn_exp]: visibleSublist === el.route
                        })}>
                        {el.name}
                    </button>
                    :
                    <Link href={`/products?categoryId=${el.id}`}>
                        <a className={cn(styles.catalogListBtn, {
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

                <AnimatePresence mode='wait' initial={false}>
                    {visibleSublist === el.route && el.subcategories.length > 0 &&
                        <motion.ul
                            {...animationConfigY}
                            className={styles.catalogSubList}>
                            {buildThirdLevel(el, el.subcategories)}
                        </motion.ul>}
                </AnimatePresence>

            </li>
        );
    });

    const buildThirdLevel = (topCategory: Category, categories: Subcategory[]) => {
        return categories.map((el, idx) => {
            const isSelected = router.query?.subCategoryId == String(el.id);

            return (
                <motion.li
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.1 * idx, bounce: 0 }}
                    key={el.id}>
                    <Link href={`/products?categoryId=${topCategory.id}&subCategoryId=${el.id}`}>
                        <a
                            className={cn(styles.catalogListBtn, {
                                [styles.catalogListBtn_active]: isSelected
                            })}
                            onClick={handleNav}>
                            {el.name}
                        </a>
                    </Link>
                </motion.li>
            );
        });
    };

    return (
        <>
            {isMobile ?
                <nav className={cn(styles.nav, className)} {...props}>
                    <button
                        className={cn(styles.burgerBtn, {
                            [styles.burgerBtn_close]: menuOpen
                        })}
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                            setCatalogOpen(!catalogOpen);
                        }}
                        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                    >
                        <span></span>
                    </button>
                    <AnimatePresence>
                        {menuOpen &&
                            <motion.ul
                                {...animationConfigX}
                                className={styles.navList}>
                                {buildFirstLevel()}
                            </motion.ul>
                        }
                    </AnimatePresence>
                </nav>
                :
                <nav className={cn(styles.nav, className)} {...props}>
                    <ul
                        {...animationConfigX}
                        className={styles.navList}>
                        {buildFirstLevel()}
                    </ul>
                </nav>
            }
        </>

    );
};
