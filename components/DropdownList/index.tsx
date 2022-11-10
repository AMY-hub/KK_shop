import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '..';
import { DropdownListProps } from './props';

import styles from './style.module.scss';

export const DropdownList = ({ title, options, className, ...props }: DropdownListProps): JSX.Element => {

    const [opened, setOpened] = useState<boolean>(false);
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        opened: {
            opacity: 1,
            height: 'auto',
            transition: shouldReduceMotion ? {} : {
                staggerChildren: 0.05
            }
        },
        closed: { opacity: 0, height: 0 }
    };

    const variantsChildren = {
        opened: { opacity: 1, height: 'fit-content' },
        closed: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
    };

    const optionItems = options.map(opt => (
        <motion.li key={opt.url} variants={variantsChildren}>
            <Button
                like='Link'
                href={opt.url}
                styleType='plain'
                size='s'
                tabIndex={opened ? 0 : -1}
            >{opt.name}
            </Button>
        </motion.li>
    ));

    return (
        <div className={cn(styles.dropdown, className)} {...props}>
            <button
                className={cn(styles.dropdownExpBtn, 'icon-arr-exp_fill', {
                    [styles.dropdownExpBtn_active]: opened
                })}
                onClick={() => setOpened(!opened)}
            >
                {title}
            </button>
            <motion.ul
                initial='closed'
                animate={opened ? 'opened' : 'closed'}
                variants={variants}
                className={styles.dropdownList}
            >
                {optionItems}
            </motion.ul>
        </div>
    );
};
