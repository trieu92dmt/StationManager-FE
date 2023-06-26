import { LoginPayload } from 'features/auth/authSlice';
import { User } from 'models/user';
import axiosClient from './axiosClient';

const loginApi = {
  login(data: LoginPayload): Promise<User> {
    const url = 'http://localhost:5000/api/v1/Auth/login';
    return axiosClient.post(url, data);
  },
};

export default loginApi;
