import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AlertMessage, Button, Input } from '..';
import { useUserContext } from '../../context/AppContext';
import { LoginFormFields } from '../../interfaces';
import { LoginFormProps } from './props';

import styles from './style.module.scss';

export const LoginForm = observer(({ className, onAuth, ...props }: LoginFormProps): JSX.Element => {
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
            onSubmit={handleSubmit((data, e) => submitHandler(data, e))}
            className={cn(styles.form, className)} {...props}>
            <Input
                {...register('email', { required: 'Обязательно для заполнения' })}
                error={errors.email}
                type='email'
                placeholder='Ваша почта*'
                isWide
            />
            <Input
                {...register('password', { required: 'Обязательно для заполнения', minLength: 5 })}
                error={errors.password}
                type='password'
                placeholder='Пароль*'
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
            {userStore.error &&
                <AlertMessage
                    message={userStore.error}
                    type='warning'
                    onClose={() => userStore.error = ''}
                />
            }
        </form>
    );
});
