import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { PackageResponse } from 'models/package';

const packageApi = {
  getListPackage(): Promise<ApiSuccessResponse<PackageResponse[]>> {
    const url = '/CarCompany/Package/get-list-package';
    return axiosClient.get(url);
  },
};

export default packageApi;
