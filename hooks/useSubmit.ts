import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, UseFormReset } from 'react-hook-form';
import { API } from '../api/axiosConfig';

// type UseSubmit = <R extends Record<string, any>, T extends FieldValues>(resetFn: UseFormReset<T>, url: string) => {
//     error: string;
//     success: boolean;
//     responseData: R
//     // setSuccess: (success: boolean) => void;
//     submitHandler: SubmitHandler<T>;
// };

export const useSubmit = <R extends Record<string, any>, T extends FieldValues>(resetFn: UseFormReset<T>, url: string) => {

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [responseData, setResponseData] = useState<R>();

    const submitHandler: SubmitHandler<T> = async (data, e) => {
        e?.preventDefault();
        try {
            setSuccess(false);
            setError('');

            const res = await API.post<T, AxiosResponse<R>>(url, data);

            if (res.status === 200) {
                setResponseData(res.data);
                setSuccess(true);
                resetFn();
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message ?
                    err.response.data.message : err.message);
            } else {
                setError('Возникла непредвиденная ошибка.');
            }
        }
    };

    return { error, success, submitHandler, responseData, setError };
};