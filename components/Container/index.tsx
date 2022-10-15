import cn from 'classnames';
import { ContainerProps } from './Container.props';

import styles from './style.module.scss';

export const Container = ({ children, className, ...props }: ContainerProps): JSX.Element => {
    return (
        <div className={cn(styles.container, className)} {...props}>
            {children}
        </div>
    );
};
