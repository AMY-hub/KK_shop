import cn from 'classnames';
import { InfoBadgeProps } from './props';

import styles from './style.module.scss';

export const InfoBadge = ({ size = 'm', styleType = 'plain', className, children, ...props }: InfoBadgeProps): JSX.Element => {
    return (
        <div
            className={cn(styles.badge, styles[size], styles[styleType], className)}
            {...props}
        >
            {children}
        </div>
    );
};
