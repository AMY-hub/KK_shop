import cn from 'classnames';
import { ProfileHeaderProps } from './props';

import styles from './style.module.scss';

export const ProfileHeader = ({ name, lastName, bonusCard, className, ...props }: ProfileHeaderProps): JSX.Element => {
    return (
        <div className={cn(styles.profile, className)} {...props}>
            <div className={styles.profileName}>
                <div>{name}</div>
                {lastName &&
                    <div>{lastName}</div>}
            </div>
            <div className={styles.profileCard}>
                бонусная карта <br />
                {`№ ${bonusCard}`}
            </div>
        </div>
    );
};
