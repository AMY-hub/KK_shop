import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AlertMessage, Button, Input } from '..';
import { useUserContext } from '../../context/AppContext';
import { LoginFormFields } from '../../interfaces';
import { LoginFormProps } from './props';

import styles from './style.module.scss';

export const LoginForm = observer(({ className, ...props }: LoginFormProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting } } = useForm<LoginFormFields>();

    const store = useUserContext();

    const submitHandler: SubmitHandler<LoginFormFields> = async (data, e) => {
        e?.preventDefault();
        await store.login(data);
        if (!store.userError) {
            reset();
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
            {store.userError &&
                <AlertMessage
                    message={store.userError}
                    type='warning'
                    onClose={() => store.setError('')}
                />
            }
        </form>
    );
});
