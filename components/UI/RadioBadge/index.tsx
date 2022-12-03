import cn from 'classnames';
import { FieldValues, useController } from 'react-hook-form';
import { RadioBadgeProps } from './props';
import { ErrorMessage } from '../..';

import styles from './style.module.scss';

export function RadioBadge<T extends FieldValues = FieldValues>(props: RadioBadgeProps<T>): JSX.Element {

    const { name, control, options, className } = props;
    const { field, fieldState } = useController({ control, name, rules: { required: 'Обязательно для заполнения' } });

    const badges = options.map(opt => (
        <label key={opt.value}>
            <input
                checked={opt.value === field.value}
                onChange={() => field.onChange(opt.value)}
                name={name}
                type="radio"
                value={opt.value}
                aria-invalid={fieldState.error ? true : false} />
            <div
                onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        field.onChange(opt.value);
                    }
                }}
                tabIndex={0}
                className={cn(styles.radioLabel, {
                    [styles.radioLabel_active]: opt.value === field.value,
                })}>
                {opt.labelTitle &&
                    <div className={styles.radioLabelTitle}>{opt.labelTitle}</div>}
                <div>{opt.labelBody}</div>
                {opt.labelFooter &&
                    <span>{opt.labelFooter}</span>}
            </div>
        </label>
    ));

    return (
        <div className={className}>
            <div className={styles.radio}>
                {badges}
            </div>
            {fieldState.error &&
                <ErrorMessage message={fieldState.error.message
                    ?? 'Возникла ошибка при заполнении формы'}
                    className={styles.errorMessage}
                />
            }
        </div>
    );
}