import { useState } from 'react';
import cn from 'classnames';
import { LoginForm, RegistrationForm } from '../../components';
import { AuthTabProps } from './props';

import styles from './style.module.scss';

export const AuthTab = ({ className, ...rest }: AuthTabProps): JSX.Element => {

    const [currentTab, setCurrentTab] = useState<'login' | 'register'>('register');

    return (
        <div className={cn(styles.auth, className)} {...rest}>
            <div className={styles.authNav}>
                <button
                    className={cn(styles.authBtn, {
                        [styles.authBtn_active]: currentTab === 'login'
                    })}
                    onClick={() => setCurrentTab('login')}
                >
                    Войти
                </button>
                <button
                    className={cn(styles.authBtn, {
                        [styles.authBtn_active]: currentTab === 'register'
                    })}
                    onClick={() => setCurrentTab('register')}
                >
                    Зарегистрироваться
                </button>
            </div>
            {currentTab === 'login' ?
                <LoginForm />
                :
                <RegistrationForm />
            }
        </div>
    );
};
