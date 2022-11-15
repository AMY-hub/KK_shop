import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { UserResponse } from '../interfaces';
import tokenService from '../services/tokenService';
import { REFRESH } from './APIendpoints';

type AxiosRequestRetry = AxiosRequestConfig & { isRetry?: boolean };

const API = axios.create({
    withCredentials: true
});

API.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use((res) => {
    return res;
}, async (err: AxiosError) => {
    console.log("ERR FROM INTERCEPTOR", err);

    const originalRequest: AxiosRequestRetry | undefined = err.config;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    originalRequest!.headers = { ...originalRequest!.headers };

    if (err.response?.status === 401
        && originalRequest
        && !originalRequest.isRetry
        && typeof window !== 'undefined') {

        originalRequest.isRetry = true;
        try {
            const res = await axios.get<UserResponse>(REFRESH, { withCredentials: true });
            console.log('INTER RUUN');
            tokenService.setAccessToken(res.data.accessToken);

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