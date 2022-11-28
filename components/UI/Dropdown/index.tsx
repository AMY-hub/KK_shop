import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DropdownProps } from './props';

import styles from './style.module.scss';

export const Dropdown = ({ children, header, inititialOpen = false, className, ...props }: DropdownProps): JSX.Element => {

    const [opened, setOpened] = useState<boolean>(inititialOpen);

    return (
        <div className={cn(styles.dropdown, className)} {...props}>
            <div
                className={styles.dropdownHeader}
                onClick={() => setOpened(!opened)}
            >
                {header}
                <button
                    type='button'
                    className={cn(styles.dropdownExpBtn, 'icon-arr-exp', {
                        [styles.dropdownExpBtn_active]: opened
                    })}>
                </button>
            </div>
            <AnimatePresence initial={false}>
                {opened &&
                    <motion.div
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
