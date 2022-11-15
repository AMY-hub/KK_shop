import { Container, Title } from '../../../components';
import { ProfileHeader } from './ProfileHeader';
import { ProfileOptions } from './ProfileOptions';
import { ProfileLayoutProps } from './props';

import styles from './style.module.scss';

export const ProfileLayout = ({ user, title, children }: ProfileLayoutProps): JSX.Element => {

    return (
        <Container className={styles.layout}>
            <ProfileHeader
                className={styles.layoutHeader}
                name={user.name}
                lastName={user.lastname}
                bonusCard={user.bonus_card.number}
            />
            <Title
                className={styles.layoutTitle}
                tag='h1'>
                {title}
            </Title>

            <div className={styles.layoutDivider}></div>

            <ProfileOptions className={styles.layoutOptions} />

            <div className={styles.profileContent}>
                {children}
            </div>
        </Container>
    );
};