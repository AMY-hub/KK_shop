import cn from 'classnames';
import Link from 'next/link';
import { ButtonProps } from './Button.props';
import styles from './style.module.scss';

export const Button = (props: ButtonProps): JSX.Element => {

    const { className, styleType = 'primary', size = 'm', wide, like } = props;
    const classes = cn(styles.btn, styles[styleType], styles[size], {
        [styles.wide]: wide,
    }, className);

    if (like === 'Link') {
        const { className, styleType, size, like, children, isActive, ...rest } = props;
        return (
            <Link {...rest}>
                <a className={cn(classes, { [styles.active]: isActive })}>{children}</a>
            </Link>
        );
    }

    if (like === 'a') {
        const { className, styleType, size, like, children, ...rest } = props;
        return (
            <a className={classes} target='_blank' {...rest}>
                {children}
            </a>
        );
    } else {
        const { className, styleType, size, like, children, withLoading, loading, ...rest } = props;

        return (
            <>
                {withLoading ?
                    <button className={classes} {...rest}>
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
                    <button className={classes} {...rest}>
                        {children}
                    </button>
                }
            </>
        );
    }
};
