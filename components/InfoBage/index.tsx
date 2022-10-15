import cn from 'classnames';
import { InfoBadgeProps } from './InfoBadge.props';

import styles from './style.module.scss';

export const InfoBadge = ({ size = 'm', styleType = 'plain', isClickable, className, children, ...props }: InfoBadgeProps): JSX.Element => {
    return (
        <div
            className={cn(styles.badge, styles[size], styles[styleType], className)}
            {...props}
        >
            {children}
        </div>
    );
};
