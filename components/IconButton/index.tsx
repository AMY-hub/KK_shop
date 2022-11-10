import cn from 'classnames';
import Link from 'next/link';
import { IconButtonProps } from './props';
import styles from './style.module.scss';

export const IconButton = (props: IconButtonProps): JSX.Element => {

    const { className, styleType = 'light', like } = props;
    const classes = cn(styles.iconBtn, styles[styleType], className);

    if (like === 'Link') {
        const { className, styleType, like, children, isActive, ...rest } = props;
        return (
            <Link {...rest}>
                <a className={cn(classes, { [styles.active]: isActive })}>{children}
                </a>
            </Link>
        );
    } else {
        const { className, styleType, like, children, ...rest } = props;
        return (
            <>
                <button className={classes} {...rest}>
                    {children}
                </button>
            </>
        );
    }
};
