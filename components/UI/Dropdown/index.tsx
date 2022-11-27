import cn from 'classnames';
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
            <div
                className={cn(styles.dropdownContent, {
                    [styles.dropdownContent_hidden]: !opened
                })}
            >
                {children}
            </div>
        </div>
    );
};
