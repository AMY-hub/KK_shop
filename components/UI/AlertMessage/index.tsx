import cn from 'classnames';
import { motion } from 'framer-motion';
import CloseIcon from '../../../assets/images/icons/clear.svg';
import { AlertMessageProps } from './props';

import styles from './style.module.scss';

export const AlertMessage = ({ message, title, type, onClose, className }: AlertMessageProps): JSX.Element => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(styles.message, styles[type], className)}
            role='alert'>
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
        </motion.div>
    );
};
