import { useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { MLoginForm, MRegistrationForm } from '../../components';
import { AuthTabProps } from './props';

import styles from './style.module.scss';

export const AuthTab = ({ className, onAuth, ...rest }: AuthTabProps): JSX.Element => {

    const [currentTab, setCurrentTab] = useState<'login' | 'register'>('register');

    return (
        <div className={cn(styles.auth, className)} {...rest}>
            <div className={styles.authNav}>
                <motion.button
                    initial={{ color: "var(--semi-black)" }}
                    animate={{
                        color: currentTab === 'login' ?
                            "var(--accent-dark)" : "var(--semi-black)"
                    }}
                    className={styles.authBtn}
                    onClick={() => setCurrentTab('login')}
                >
                    Войти
                    {currentTab === 'login' &&
                        <motion.span
                            className={styles.activeLine}
                            layoutId="active"></motion.span>}
                </motion.button>
                <motion.button
                    initial={{ color: "var(--semi-black)" }}
                    animate={{
                        color: currentTab === 'register' ?
                            "var(--accent-dark)" : "var(--semi-black)"
                    }}
                    className={styles.authBtn}
                    onClick={() => setCurrentTab('register')}
                >
                    Зарегистрироваться
                    {currentTab === 'register' &&
                        <motion.span
                            className={styles.activeLine}
                            layoutId="active"></motion.span>}
                </motion.button>
            </div>
            {currentTab === 'login' ?
                <MLoginForm
                    layoutId='auth'
                    onAuth={onAuth} />
                :
                <MRegistrationForm
                    layoutId='auth'
                    onAuth={onAuth} />
            }
        </div>
    );
};
