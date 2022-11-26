import { StepHeaderProps } from './props';

import styles from './style.module.scss';

export const StepHeader = ({ step, title }: StepHeaderProps): JSX.Element => {
    return (
        <div className={styles.header}>
            <span className={styles.headerStep}>{step}</span>
            <h2 className={styles.headerTitle}>{title}</h2>
        </div>
    );
};