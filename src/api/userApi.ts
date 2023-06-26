import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { UserRegister } from 'models/user';

const userApi = {
    register(data: UserRegister): Promise<ApiSuccessResponse<boolean>> {
        const url = 'http://localhost:5000/api/v1/Auth/register';
        return axiosClient.post(url, data);
      },
    

};

export default userApi;
