import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { RadioBadgeProps } from './props';
import { ErrorMessage } from '../index';

import styles from './style.module.scss';

export const RadioBadge = forwardRef((props: RadioBadgeProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    const { error, name, options, value, onChange } = props;
    const [selected, setSelected] = useState<string>(value || '');

    useEffect(() => {
        if (onChange) {
            onChange(selected);
        }
    }, [selected, onChange, value]);

    const badges = options.map(opt => (
        <label key={opt.value}>
            <input
                ref={ref}
                checked={opt.value === selected}
                onChange={() => setSelected(opt.value)}
                name={name} type="radio" value={opt.value} />
            <div
                onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        setSelected(opt.value);
                    }
                }}
                tabIndex={0}
                className={cn(styles.radioLabel, {
                    [styles.radioLabel_active]: opt.value === selected,
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
        <div>
            <div className={styles.radio}>
                {badges}

            </div>
            {error?.message &&
                <ErrorMessage message={error.message}
                    className={styles.errorMessage}
                    role='alert' />
            }
        </div>
    );
});