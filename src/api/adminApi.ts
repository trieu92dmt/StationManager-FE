import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { ApproveStatusCarCompanyCommand, CarCompanyDetailResponse, CarCompanyResponse, ChangeStatusCarCompanyCommand, SearchCarCompanyCommand } from 'models/admin/admin';

const AdminApi = {

    getListDelivery(params: SearchCarCompanyCommand): Promise<ApiSuccessResponse<CarCompanyResponse[]>> {
        const url = '/CarCompany/Admin/get-list-car-company';
        return axiosClient.post(url, params);
    },

    approveCarCompany(params: ApproveStatusCarCompanyCommand): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Admin/approve-car-company';
        return axiosClient.post(url, params);
    },

    changeStatusCarCompany(params: ChangeStatusCarCompanyCommand): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Admin/change-status-car-company';
        return axiosClient.post(url, params);
    },

    getCarCompanyDetail(params: string | null): Promise<ApiSuccessResponse<CarCompanyDetailResponse>> {
        const url = '/CarCompany/Admin/get-detail-car-company';
        return axiosClient.get(url, { params: { carCompanyId: params } });
    },
}

export default AdminApi;
