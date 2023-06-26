import { ApiSuccessResponse, CommonResponse, CommonResponse4, ListParams } from "models";
import axiosClient from "./axiosClient";


const provinceApi = {
  getAll(params: ListParams): Promise<ApiSuccessResponse<CommonResponse[]>> {
    const url = '/Utilities/Common/list-district-by-province';
    return axiosClient.get(url, { params });
  },

  getListProvince(params: string | null): Promise<ApiSuccessResponse<CommonResponse4[]>> {
    if (params == '')
      params = null;
    const url = '/Utilities/Common/list-province-v2';
    return axiosClient.get(url, { params: { keyword: params } });
  },
  getAllProvince(): Promise<ApiSuccessResponse<CommonResponse4[]>> {
    const url = '/Utilities/Common/list-all-province';
    return axiosClient.get(url);
  },
}

export default provinceApi;