import axios, { AxiosResponse } from 'axios';
import { LOGIN, REGISTRATION, LOGOUT, REFRESH } from '../api/APIendpoints';
import { API } from '../api/axiosConfig';
import { LoginFormFields, RegisterFormFields, UserResponse } from '../interfaces';

class UserService {

    async login(data: LoginFormFields): Promise<AxiosResponse<UserResponse>> {
        return API.post<UserResponse>(LOGIN, data);
    }

    async registration(data: RegisterFormFields): Promise<AxiosResponse<UserResponse>> {
        return API.post<UserResponse>(REGISTRATION, data);
    }

    async logout(): Promise<void> {
        return API.get(LOGOUT);
    }

    async checkAuth(): Promise<AxiosResponse<UserResponse>> {
        return axios.get<UserResponse>(REFRESH, { withCredentials: true });
    }
}

export default new UserService();