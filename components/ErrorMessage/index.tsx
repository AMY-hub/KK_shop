import cn from 'classnames';
import { ErrorMessageProps } from './props';

import styles from './style.module.scss';

export const ErrorMessage = ({ message, className, ...props }: ErrorMessageProps): JSX.Element => {
    return (
        <p className={cn(styles.error, className)} {...props}>
            {message}
        </p>
    );
};
