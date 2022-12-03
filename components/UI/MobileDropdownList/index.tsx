import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import { Button } from '../..';
import { useMathMedia } from '../../../hooks/useMathMedia';
import { DropdownListProps } from './props';

import styles from './style.module.scss';

export const DropdownList = ({ title, options, className, ...props }: DropdownListProps): JSX.Element => {

    const [opened, setOpened] = useState<boolean>(false);
    const id = useId();
    const isMobile = useMathMedia('(max-width: 760px)');

    const optionItems = options.map(opt => (
        <motion.li key={opt.url}>
            <Button
                like='Link'
                href={opt.url}
                styleType='plain'
                size='s'
                className={cn({ [styles.disabled]: !opened })}
            >{opt.name}
            </Button>
        </motion.li>
    ));

    return (
        <div className={cn(styles.dropdown, className)} {...props}>
            {isMobile ?
                <>
                    <button
                        className={cn(styles.dropdownExpBtn, 'icon-arr-exp_fill', {
                            [styles.dropdownExpBtn_active]: opened
                        })}
                        aria-expanded={opened}
                        aria-controls={id}
                        onClick={() => setOpened(!opened)}
                    >
                        {title}
                    </button>
                    <AnimatePresence initial={false}>
                        {opened &&
                            <motion.ul
                                id={id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ bounce: 0 }}
                                className={styles.dropdownList}
                            >
                                {optionItems}
                            </motion.ul>}
                    </AnimatePresence>
                </>
                :
                <>
                    <div className={styles.dropdownTitle}>{title}</div>
                    <ul className={styles.dropdownList}>
                        {optionItems}
                    </ul>
                </>
            }
        </div>
    );
};
