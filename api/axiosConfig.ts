import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { UserResponse } from '../interfaces';
import { REFRESH } from './APIendpoints';
import { state } from '../store/store';

type AxiosRequestRetry = AxiosRequestConfig & { isRetry?: boolean };

const API = axios.create({
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${state.accessToken}`
    }
});

API.interceptors.response.use((res) => {
    return res;
}, async (err: AxiosError) => {
    console.log("ERR FROM INTERCEPTOR", err);

    const originalRequest: AxiosRequestRetry | undefined = err.config;
    originalRequest!.headers = { ...originalRequest!.headers };

    if (err.response?.status === 401
        && originalRequest
        && !originalRequest.isRetry
        && typeof window !== 'undefined') {

        originalRequest.isRetry = true;
        try {
            const res = await axios.get<UserResponse>(REFRESH, { withCredentials: true });
            console.log('INTER RUUN');
            state.setAccessToken(res.data.accessToken);

            originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;

            return API.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    } else {
        throw err;
    }
});

export { API };