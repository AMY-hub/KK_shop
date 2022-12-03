import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import { DropdownProps } from './props';

import styles from './style.module.scss';

export const Dropdown = ({ children, header, inititialOpen = false, className, ...props }: DropdownProps): JSX.Element => {

    const [opened, setOpened] = useState<boolean>(inititialOpen);
    const id = useId();

    return (
        <div className={cn(styles.dropdown, className)} {...props}>
            <button
                type='button'
                aria-expanded={opened}
                aria-controls={id}
                aria-label={opened ? `Свернуть секцию ${header}`
                    : `Развернуть секцию ${header}`}
                onClick={() => setOpened(!opened)}
                className={cn(styles.dropdownExpBtn, 'icon-arr-exp', {
                    [styles.dropdownExpBtn_active]: opened
                })}>
                {header}
            </button>
            <AnimatePresence initial={false}>
                {opened &&
                    <motion.div
                        id={id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ bounce: 0 }}
                        className={styles.dropdownContent}
                    >
                        {children}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};
