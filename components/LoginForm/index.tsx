import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { ForwardedRef, forwardRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MAlertMessage, Button, Input } from '..';
import { useUserContext } from '../../context/AppContext';
import { LoginFormFields } from '../../interfaces';
import { LoginFormProps } from './props';

import styles from './style.module.scss';

export const LoginForm = observer(forwardRef(({ className, onAuth, ...props }: LoginFormProps, ref: ForwardedRef<HTMLFormElement>): JSX.Element => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting } } = useForm<LoginFormFields>();

    const userStore = useUserContext();

    const submitHandler: SubmitHandler<LoginFormFields> = async (data, e) => {
        e?.preventDefault();
        await userStore.login(data);
        if (!userStore.error) {
            reset();
            onAuth();
        }
    };

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit((data, e) => submitHandler(data, e))}
            className={cn(styles.form, className)} {...props}>
            <Input
                {...register('email', { required: 'Обязательно для заполнения' })}
                error={errors.email}
                type='email'
                placeholder='Ваша почта'
                required
                isWide
            />
            <Input
                {...register('password', { required: 'Обязательно для заполнения', minLength: 5 })}
                error={errors.password}
                type='password'
                placeholder='Пароль'
                required
                isWide
            />
            <Button
                withLoading
                loading={isSubmitting}
                type='submit'
                isWide
            >
                Войти
            </Button>

            <AnimatePresence>
                {userStore.error &&
                    <MAlertMessage
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ bounce: 0 }}
                        message={userStore.error}
                        type='warning'
                        onClose={() => userStore.error = ''}
                    />
                }
            </AnimatePresence>
        </form>
    );
}));

export const MLoginForm = motion(LoginForm);