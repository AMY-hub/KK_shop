/* eslint-disable @typescript-eslint/no-unused-vars */
import cn from 'classnames';
import Link from 'next/link';
import { ButtonProps } from './props';
import styles from './style.module.scss';

export const Button = (props: ButtonProps): JSX.Element => {

    const { className, styleType = 'primary', size = 'm', isWide, like } = props;
    const classes = cn(styles.btn, styles[styleType], styles[size], {
        [styles.wide]: isWide,
    }, className);

    if (like === 'Link') {
        const { className, isWide, styleType, size, like, children, isActive, href, ...rest } = props;
        return (
            <Link href={href}>
                <a className={cn(classes, { [styles.active]: isActive })}
                    {...rest}
                >{children}</a>
            </Link>
        );
    }

    if (like === 'a') {
        const { className, isWide, styleType, size, like, children, ...rest } = props;
        return (
            <a className={classes} target='_blank' {...rest}>
                {children}
            </a>
        );
    } else {
        const { className, isWide, styleType, size, like, children, withLoading, loading, ...rest } = props;

        return (
            <>
                {withLoading ?
                    <button
                        type='button'
                        className={classes} {...rest}>
                        {loading ?
                            <>
                                <div className={styles.loader}></div>
                                <span className={styles.hidden}>{children}</span>
                            </>
                            :
                            children
                        }
                    </button>
                    :
                    <button
                        type='button'
                        className={classes} {...rest}>
                        {children}
                    </button>
                }
            </>
        );
    }
};
