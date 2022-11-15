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
}

export default new UserService();