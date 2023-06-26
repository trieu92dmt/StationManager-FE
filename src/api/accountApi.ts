import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { AccountResponse, SearchAccountCommand, UpdateAccountCommand } from 'models/admin/account';

const AccountApi = {

    getListAccount(params: SearchAccountCommand): Promise<ApiSuccessResponse<AccountResponse[]>> {
        const url = '/Permission/Account/search-account';
        return axiosClient.post(url, params);
    },

    updateStatusAccount(params: UpdateAccountCommand): Promise<ApiSuccessResponse<boolean>> {
        const url = '/Permission/Account/update-account';
        return axiosClient.post(url, params);
    },
}

export default AccountApi;
