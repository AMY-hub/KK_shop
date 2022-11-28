import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, UseFormReset } from 'react-hook-form';
import { SUBSCRIBER } from '../../api/APIendpoints';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { FormInput } from './props';

type UseSubmit = (reset: UseFormReset<FormInput>) => {
    success: boolean,
    error: string,
    setError: (err: string) => void,
    submitHandler: SubmitHandler<FormInput>
};

export const useSubmit: UseSubmit = (reset) => {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const submitHandler: SubmitHandler<FormInput> = async ({ email }, e) => {
        e?.preventDefault();
        try {
            setSuccess(false);
            setError('');
            const res = await axios.post<FormInput>(SUBSCRIBER, { email });
            if (res.status === 200) {
                setSuccess(true);
                reset();
            }
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };
    return { success, error, setError, submitHandler };
};