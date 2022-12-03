import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { InputFormProps } from './props';
import ArrowIcon from '../../../assets/images/icons/round_arr.svg';

import styles from './style.module.scss';

export const InputForm = forwardRef(({ placeholder, className, ...rest }: InputFormProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

    return (
        <form className={cn(styles.form, className)} {...rest}>
            <input
                ref={ref}
                required
                placeholder={placeholder} />
            <button
                type='submit'
                aria-label='отправить'>
                <ArrowIcon widht={24} height={24} />
            </button>
        </form>
    );
});
