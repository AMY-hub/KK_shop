import cn from 'classnames';
import { FieldValues, useController } from 'react-hook-form';
import { CustomCheckboxProps } from './props';

import styles from './style.module.scss';

export function CustomCheckbox<T extends FieldValues = FieldValues>({ label, control, name, value, className, required = true }: CustomCheckboxProps<T>) {

    const { field, fieldState } = useController({ control, name, rules: { required } });

    return (
        <div className={cn(styles.wrapper, className)}>
            <label className={styles.check}>
                <input
                    type='checkbox'
                    required={required}
                    value={value}
                    checked={field.value}
                    aria-invalid={fieldState.error ? true : false}
                    onChange={(e) => field.onChange(e.target.checked)}
                />
                <div
                    className={cn(styles.checkFake, {
                        [styles.checkFake_checked]: field.value,
                        [styles.checkFake_error]: fieldState.error
                    })} >
                    {field.value &&
                        <svg
                            version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                            <g><path d="M132.5,377.5l285.8,285.8L867.5,91.7L990,214.2L418.3,908.3L10,500L132.5,377.5z" /></g>
                        </svg>
                    }
                </div>
                <span>
                    {label}
                </span>
            </label>
        </div>
    );
}