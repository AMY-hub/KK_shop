import { ChangeEventHandler, ForwardedRef, forwardRef, useState } from 'react';
import cn from 'classnames';
import { InputTelProps } from './props';
import { ErrorMessage } from '../index';

import styles from './style.module.scss';

export const InputTel = forwardRef(({ code, error, isWide, className, onChange, ...props }: InputTelProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    const [phone, setPhone] = useState<string>('');

    function formatPhone(value: string) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d)/, "($1) $2");
        value = value.replace(/(\d{3})(\d)/, "$1-$2");
        value = value.replace(/(-\d{2})(\d)/, "$1-$2");
        return value;
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value.length > 15) {
            return;
        }
        const newValue = formatPhone(e.target.value);
        setPhone(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={className}>
            <div className={styles.inputWrapper}>
                <span>{code}</span>
                <input className={cn(styles.input, {
                    [styles.input_error]: error,
                    [styles.input_wide]: isWide
                })}
                    {...props}
                    type='tel'
                    value={phone}
                    onChange={handleChange}
                    ref={ref}
                />
            </div>
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.errorMessage}
                    role='alert' />
            }
        </div>
    );
});