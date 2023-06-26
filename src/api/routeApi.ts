import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { toast } from 'react-toastify';
import { AddRouteRequest, DetailRouteResponse, GetListRouteRequest, RouteResponse, UpdateRouteRequest } from 'models/carCompany/route/route';

const RouteApi = {
    // getListPosition(): Promise<ApiSuccessResponse<CommonResponse2[]>> {
    //     const url = '/Utilities/Common/list-position';
    //     return axiosClient.get(url);
    // },

    // getListEmployeeCode(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
    //     const url = '/CarCompany/Employee/get-list-employee-code';
    //     return axiosClient.get(url, { params: { accountId: params } });
    // },

    // getListEmployeeName(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
    //     const url = '/CarCompany/Employee/get-list-employee-name';
    //     return axiosClient.get(url, { params: { accountId: params } });
    // },

    getListRoute(params: GetListRouteRequest): Promise<ApiSuccessResponse<RouteResponse[]>> {
        const url = '/CarCompany/Route/get-list-route';
        return axiosClient.post(url, params);
    },

    getDetailRoute(params: string): Promise<ApiSuccessResponse<DetailRouteResponse>> {
        const url = '/CarCompany/Route/get-detail-route';
        return axiosClient.get(url, { params: { routeId: params } });
    },

    updateRoute(data: UpdateRouteRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Route/update-route';
        return axiosClient.post(url, data);
    },

    addRoute(data: AddRouteRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Route/add-route';
        return axiosClient.post(url, data);
    },

    removeRoute(routeId: string): Promise<ApiSuccessResponse<boolean>> {
        const url = `/CarCompany/Route/remove-route/${routeId}`;
        return axiosClient.delete(url);
      },
}

export async function updateRoute(request: UpdateRouteRequest) {
    const response = await RouteApi.updateRoute(request)

    if (response.data === true) {
        // Toast success
        toast.success('Cập nhật thông tin tuyến xe !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
        setTimeout(function () {
            window.location.reload();
        }, 3000); // Chờ 3 giây trước khi reload
    }
    else {
        toast.error('Đã có lỗi xảy ra !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
}

export async function addRoute(request: AddRouteRequest) {
    const response = await RouteApi.addRoute(request)

    if (response.isSuccess === true) {
        // Toast success
        toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        setTimeout(function () {
            window.location.reload();
        }, 1500); // Chờ 3 giây trước khi reload
    }
    else {
        toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
}

export default RouteApi;
