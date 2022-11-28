import cn from 'classnames';
import { motion } from 'framer-motion';
import { ForwardedRef, forwardRef } from 'react';
import CloseIcon from '../../../assets/images/icons/clear.svg';
import { AlertMessageProps } from './props';

import styles from './style.module.scss';

export const AlertMessage = forwardRef(({ message, title, type, onClose, className }: AlertMessageProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <div
            className={cn(styles.message, styles[type], className)}
            role='alert'
            ref={ref}>
            <div className={styles.messageContent}>
                {title &&
                    <div className={styles.messageTitle}>
                        {title}
                    </div>
                }
                <p>{message}</p>
                {onClose &&
                    <button
                        type='button'
                        className={styles.messageClose}
                        onClick={onClose}
                        aria-label='Закрыть уведомление'
                    >
                        <CloseIcon />
                    </button>
                }
            </div>
        </div>
    );
});

export const MAlertMessage = motion(AlertMessage);
