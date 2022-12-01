import cn from 'classnames';
import { GridProps } from './props';

import styles from './style.module.scss';

export const Grid = ({ children, className, ...props }:GridProps): JSX.Element => {
    return (
        <div className={cn(styles.grid, className)} {...props}>
            {children}
        </div>
    );
};
