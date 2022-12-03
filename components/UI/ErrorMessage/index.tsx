import cn from 'classnames';
import { ErrorMessageProps } from './props';

import styles from './style.module.scss';

export const ErrorMessage = ({ message, className, ...props }: ErrorMessageProps): JSX.Element => {
    return (
        <p role='alert' className={cn(styles.error, className)} {...props}>
            {message}
        </p>
    );
};
