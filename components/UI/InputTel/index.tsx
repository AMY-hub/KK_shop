import { ChangeEventHandler, useId, useState } from 'react';
import cn from 'classnames';
import { FieldValues, useController } from 'react-hook-form';
import { InputTelProps } from './props';
import { ErrorMessage } from '../..';

import styles from './style.module.scss';

export function InputTel<T extends FieldValues = FieldValues>({ control, name, code, isWide, className, ...props }: InputTelProps<T>): JSX.Element {

    const [phone, setPhone] = useState<string>(code);
    const id = useId();
    const { field, fieldState } = useController({ control, name, rules: { required: 'Обязательно для заполнения', maxLength: 18, minLength: 18 } });

    function formatPhone(value: string) {
        value = value.slice(code.length);
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d)/, "($1) $2");
        value = value.replace(/(\d{3})(\d)/, "$1-$2");
        value = value.replace(/(-\d{2})(\d)/, "$1-$2");
        return code + value;
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value.length > 18) {
            return;
        }
        const newValue = formatPhone(e.target.value);
        setPhone(newValue);
        field.onChange(newValue);
    };

    return (
        <div className={className}>
            <div className={styles.inputWrapper}>
                <input className={cn(styles.input, {
                    [styles.input_error]: fieldState.error,
                    [styles.input_wide]: isWide
                })}
                    aria-invalid={fieldState.error ? true : false}
                    aria-describedby={id}
                    {...props}
                    type='tel'
                    value={phone}
                    onChange={handleChange}
                />
            </div>
            <span id={id} className={styles.inputHint}>
                Введите номер телефона, начиная с цифры 9
            </span>
            {fieldState.error &&
                <ErrorMessage message={fieldState.error.message
                    || 'Возникла ошибка при заполнении формы'}
                    className={styles.errorMessage}
                    role='alert' />
            }
        </div>
    );
}