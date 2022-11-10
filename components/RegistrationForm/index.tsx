import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AlertMessage, Button, CustomCheckbox, Input } from '..';
import { useUserContext } from '../../context/AppContext';
import { RegisterFormFields } from '../../interfaces';
import { RegistrationFormProps } from './props';

import styles from './style.module.scss';

export const RegistrationForm = observer(({ className, ...props }: RegistrationFormProps): JSX.Element => {

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting } } = useForm<RegisterFormFields>({
            defaultValues: { privacyCheck: false }
        });


    const store = useUserContext();

    const submitHandler: SubmitHandler<RegisterFormFields> = async (data, e) => {
        e?.preventDefault();
        if (!data.birthdate) {
            data.birthdate = null;
        }
        await store.registration(data);
        if (!store.userError) {
            reset();
        }
    };

    const privacyLabel = (
        <>
            Я даю согласие на обработку своих персональных данных в соответсвии с
            <Link href='/privacy'>
                <a> Политикой в отношении обработки персональных данных.</a>
            </Link>
        </>
    );

    return (
        <form
            onSubmit={handleSubmit((data, e) => submitHandler(data, e))}
            className={cn(styles.form, className)} {...props}>
            <Input
                {...register('name', { required: 'Обязательно для заполнения', maxLength: 20 })}
                error={errors.name}
                placeholder='Имя*'
                isWide
            />
            <Input
                {...register('lastname', { maxLength: 20 })}
                error={errors.lastname}
                placeholder='Фамилия'
                isWide
            />
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
            <Input
                {...register('birthdate')}
                error={errors.birthdate}
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
                placeholder='Дата рождения'
                isWide
            />
            <Controller
                name='privacyCheck'
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, onChange, value } }) => (
                    <CustomCheckbox
                        error={errors.privacyCheck}
                        label={privacyLabel}
                        ref={ref}
                        onChange={onChange}
                        value={value}
                    />
                )}
            />
            <Button
                withLoading
                loading={isSubmitting}
                type='submit'
                isWide
            >
                Зарегистрироваться
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
