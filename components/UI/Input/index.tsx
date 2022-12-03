import { ForwardedRef, forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { InputProps } from './props';
import { ErrorMessage } from '../..';

import styles from './style.module.scss';

export const Input = forwardRef(({ error, hint, isWide, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    const id = useId();

    return (
        <motion.div layout className={cn(styles.inputWrapper, className)}>
            <input className={cn(styles.input, {
                [styles.input_error]: error,
                [styles.input_wide]: isWide
            })}
                aria-invalid={error ? true : false}
                aria-describedby={id}
                {...props}
                ref={ref}
            />
            <span
                id={id}
                className={styles.inputHint}>
                {hint}
            </span>
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.errorMessage} />
            }
        </motion.div>
    );
});