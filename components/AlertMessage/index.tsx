import cn from 'classnames';
import CloseIcon from '../../assets/images/icons/clear.svg';
import { AlertMessageProps } from './props';

import styles from './style.module.scss';

export const AlertMessage = ({ message, title, type, onClose, className, ...props }: AlertMessageProps): JSX.Element => {
    return (
        <div
            className={cn(styles.message, styles[type], className)}
            role='alert'
            {...props}>
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
    );
};
