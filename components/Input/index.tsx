import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { InputProps } from './props';
import { ErrorMessage } from '../index';

import styles from './style.module.scss';

export const Input = forwardRef(({ error, isWide, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <div className={cn(styles.inputWrapper, className)}>
            <input className={cn(styles.input, {
                [styles.input_error]: error,
                [styles.input_wide]: isWide
            })}
                {...props}
                ref={ref}
            />
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.errorMessage}
                    role='alert' />
            }
        </div>
    );
});