import axios from 'axios';

export const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err) && err.response) {
        return err.response.data.message ?
            err.response.data.message : err.message;
    } else {
        return 'Возникла непредвиденная ошибка.';
    }
};