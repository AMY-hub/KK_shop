import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, UseFormReset, UseFormSetError } from 'react-hook-form';
import { SUBSCRIBER } from '../../api/APIendpoints';
import { FormInput } from './props';

type UseSubmit = (setError: UseFormSetError<FormInput>, reset: UseFormReset<FormInput>) => {
    success: boolean,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    onSubmit: SubmitHandler<FormInput>
};

export const useSubmit: UseSubmit = (setError, reset) => {
    const [success, setSuccess] = useState<boolean>(false);
    const onSubmit: SubmitHandler<FormInput> = async ({ email }, e) => {
        e?.preventDefault();
        try {
            setSuccess(false);
            const res = await axios.post<FormInput>(SUBSCRIBER, { email });
            if (res.status === 200) {
                setSuccess(true);
                reset();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError('email', {
                    message: err.response?.data.message || 'Error sending email. Please try again.'
                });
            } else {
                setError('email', {
                    message: 'Error sending email. Please try again.'
                });
            }
        }
    };
    return { success, setSuccess, onSubmit };
};