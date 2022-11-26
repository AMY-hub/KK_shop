import cn from 'classnames';
import { isEmptySpaces } from '../../helpers/isEmptySpaces';
import { useForm } from "react-hook-form";
import { FormInput, SubscriptionFormProps } from './props';
import { useSubmit } from '../../hooks/useSubmit';
import { SUBSCRIBER } from '../../api/APIendpoints';
import { Title, Button, Input, AlertMessage } from '..';

import styles from './style.module.scss';

export const SubscriptionForm = ({ className, ...props }: SubscriptionFormProps): JSX.Element => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting } } = useForm<FormInput>();

    const {
        success,
        error,
        setError,
        submitHandler } = useSubmit(reset, SUBSCRIBER);

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <form
                onSubmit={handleSubmit((data, e) => submitHandler(data, e))}
                className={styles.form}>
                <Title tag='h2'
                    className={styles.formTitle}>
                    Подпишитесь на рассылку
                </Title>
                <p>
                    Узнай первым о старте скидок и специальных предложений!
                </p>
                <Input
                    {...register('email', {
                        required: true,
                        validate: isEmptySpaces
                    })}
                    error={errors.email}
                    type='email'
                    required
                    className={styles.formInput}
                    isWide
                    placeholder='Введите почту'
                />
                <Button
                    size='l'
                    isWide
                    type='submit'
                    withLoading
                    loading={isSubmitting}
                    className={styles.formBtn}
                >
                    Подписаться
                </Button>
                {error &&
                    <AlertMessage
                        message={error}
                        type='warning'
                        className={styles.formAlert}
                        onClose={() => setError('')}
                    />
                }
                {success &&
                    <AlertMessage
                        type='success'
                        message='Вы успешно подписаны на рассылку!'
                        className={styles.formAlert}
                    />
                }
            </form>
        </div>
    );
};
