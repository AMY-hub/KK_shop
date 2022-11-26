import cn from 'classnames';
import { InputFormProps } from './props';
import ArrowIcon from '../../assets/images/icons/round_arr.svg';

import styles from './style.module.scss';
import { ForwardedRef, forwardRef } from 'react';

export const InputForm = forwardRef(({ placeholder, className, ...rest }: InputFormProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    return (
        <form className={cn(styles.form, className)} {...rest}>
            <input
                ref={ref}
                placeholder={placeholder} />
            <button type='submit'>
                <ArrowIcon widht={24} height={24} />
            </button>
        </form>
    );
});
