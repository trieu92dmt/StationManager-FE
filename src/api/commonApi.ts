import { ApiSuccessResponse, CommonResponse2, GetListTripByRouteIdRequest } from 'models';
import axiosClient from './axiosClient';

const CommonApi = {
    getListRoute(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-route';
        return axiosClient.get(url, { params: { accountId: params } });
    },

    getListTripByRouteId(params: GetListTripByRouteIdRequest): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-trip-by-route-id';
        return axiosClient.get(url, { params: { routeId: params.routeId, startDate: params.startDate } });
    },

    getListCarCompany(): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-carCompany';
        return axiosClient.get(url);
    },

    getListCarCompanyAdmin(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-car-company-admin';
        return axiosClient.get(url, { params: { keyword: params } });
    },

    getListRole(): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-role';
        return axiosClient.get(url);
    },
}


export default CommonApi;
