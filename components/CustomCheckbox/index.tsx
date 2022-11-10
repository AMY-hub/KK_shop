import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { CustomCheckboxProps } from './props';
import { ErrorMessage } from '../index';

import styles from './style.module.scss';

export const CustomCheckbox = forwardRef((props: CustomCheckboxProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    const { label, error, onChange, className, value, ...rest } = props;
    const [checked, setChecked] = useState<boolean>(value);

    useEffect(() => {
        if (onChange) {
            onChange(checked);
        }
    }, [checked, onChange, value]);

    return (
        <div className={cn(styles.wrapper, className)}>
            <label className={styles.check}>
                <input
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    type='checkbox'
                    {...rest}
                    ref={ref}
                />
                <div
                    className={cn(styles.checkFake, {
                        [styles.checkFake_checked]: checked,
                        [styles.checkFake_error]: error
                    })} >
                    {checked &&
                        <svg
                            version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xmlSpace="preserve">
                            <g><path d="M132.5,377.5l285.8,285.8L867.5,91.7L990,214.2L418.3,908.3L10,500L132.5,377.5z" /></g>
                        </svg>
                    }
                </div>
                <span>
                    {label}
                </span>
            </label>
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.errorMessage}
                    role='alert' />
            }
        </div>
    );
});