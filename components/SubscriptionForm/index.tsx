import cn from 'classnames';
import { isEmptySpaces } from '../../helpers/isEmptySpaces';
import { useForm } from "react-hook-form";
import { useSubmit } from './useSubmit';
import { AnimatePresence } from 'framer-motion';
import { FormInput, SubscriptionFormProps } from './props';
import { Title, Button, Input, MAlertMessage } from '..';

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
        submitHandler } = useSubmit(reset);

    const animationConfig = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
        transition: { bounce: 0 },
    };

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
                <AnimatePresence>
                    {error &&
                        <MAlertMessage
                            {...animationConfig}
                            message={error}
                            type='warning'
                            className={styles.formAlert}
                            onClose={() => setError('')}
                        />
                    }
                    {success &&
                        <MAlertMessage
                            {...animationConfig}
                            type='success'
                            message='Вы успешно подписаны на рассылку!'
                            className={styles.formAlert}
                        />
                    }
                </AnimatePresence>
            </form>
        </div>
    );
};
