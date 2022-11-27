import cn from 'classnames';
import { ParagraphProps } from './props';

import styles from './style.module.scss';

export const Paragraph = ({ children, fontSize = 'm', className, ...props }: ParagraphProps): JSX.Element => {
    return (
        <p className={cn(styles.text, styles[fontSize], className)} {...props}>
            {children}
        </p >
    );
};