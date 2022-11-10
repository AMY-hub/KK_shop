import axios, { AxiosResponse } from 'axios';
import { LOGIN, REGISTRATION, LOGOUT, REFRESH } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { LoginFormFields, RegisterFormFields, UserResponse } from '../interfaces';

class UserService {

    login = async (data: LoginFormFields): Promise<AxiosResponse<UserResponse>> => {
        return API.post<UserResponse>(LOGIN, data);
    };

    registration = async (data: RegisterFormFields): Promise<AxiosResponse<UserResponse>> => {
        return API.post<UserResponse>(REGISTRATION, data);
    };

    logout = async (): Promise<void> => {
        return API.get(LOGOUT);
    };

    checkAuth = async (): Promise<AxiosResponse<UserResponse>> => {
        return axios.get<UserResponse>(REFRESH, { withCredentials: true });
    };

    getAccessToken(): string {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            return token ? token : '';
        } else {
            return '';
        }
    }

    setAccessToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', token);
        }
    }

    removeAccessToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
        }
    }
}

export default new UserService();