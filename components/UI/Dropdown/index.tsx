import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';
import { DropdownProps } from './props';

import styles from './style.module.scss';

export const Dropdown = ({ children, header, opened = false, className, ...props }: DropdownProps): JSX.Element => {

    const [isOpened, setOpened] = useState<boolean>(opened);
    const id = useId();

    useEffect(() => {
        setOpened(opened);
    }, [opened]);


    return (
        <div className={cn(styles.dropdown, className)} {...props}>
            <button
                type='button'
                aria-expanded={isOpened}
                aria-controls={id}
                aria-label={isOpened ? `Свернуть секцию ${header}`
                    : `Развернуть секцию ${header}`}
                onClick={() => setOpened(!isOpened)}
                className={cn(styles.dropdownExpBtn, 'icon-arr-exp', {
                    [styles.dropdownExpBtn_active]: isOpened
                })}>
                {header}
            </button>
            <AnimatePresence initial={false}>
                {isOpened &&
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
