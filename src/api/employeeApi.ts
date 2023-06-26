import { ApiSuccessResponse, CommonResponse2 } from 'models';
import axiosClient from './axiosClient';
import { AddEmployeeRequest, DetailEmployeeResponse, EmployeeResponse, UpdateEmployeeRequest } from 'models/carCompany/employee/employee';
import { toast } from 'react-toastify';

export interface GetListEmployeeRequest {
    accountId: string | null,
    employeeCode: number | null,
    employeeName: string | null,
    positionCode: string | null
}


const EmployeeApi = {
    getListPosition(): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-position';
        return axiosClient.get(url);
    },

    getListDriver(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/Utilities/Common/list-driver';
        return axiosClient.get(url, { params: { accountId: params } });
    },

    getListEmployeeCode(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/CarCompany/Employee/get-list-employee-code';
        return axiosClient.get(url, { params: { accountId: params } });
    },

    getListEmployeeName(params: string | null): Promise<ApiSuccessResponse<CommonResponse2[]>> {
        const url = '/CarCompany/Employee/get-list-employee-name';
        return axiosClient.get(url, { params: { accountId: params } });
    },

    getListEmployee(params: GetListEmployeeRequest): Promise<ApiSuccessResponse<EmployeeResponse[]>> {
        const url = '/CarCompany/Employee/get-list-employee';
        return axiosClient.post(url, params);
    },

    getDetailEmployee(params: string): Promise<ApiSuccessResponse<DetailEmployeeResponse>> {
        const url = '/CarCompany/Employee/get-detail-employee';
        return axiosClient.get(url, { params: { employeeId: params } });
    },

    updateEmployee(data: UpdateEmployeeRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Employee/update-employee';
        return axiosClient.post(url, data);
    },

    addEmployee(data: AddEmployeeRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Employee/add-employee';
        return axiosClient.post(url, data);
    },

    removeEmployee(employeeId: string): Promise<ApiSuccessResponse<boolean>> {
        const url = `/CarCompany/Employee/remove-employee/${employeeId}`;
        return axiosClient.delete(url);
      },
}

export async function updateEmployee(request: UpdateEmployeeRequest) {
    const response = await EmployeeApi.updateEmployee(request)

    if (response.data === true) {
        // Toast success
        toast.success('Cập nhật thông tin nhân viên thành công !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        setTimeout(function () {
            window.location.reload();
        }, 1500); // Chờ 3 giây trước khi reload
    }
    else {
        toast.error('Đã có lỗi xảy ra !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
}

export async function addEmployee(request: AddEmployeeRequest) {
    const response = await EmployeeApi.addEmployee(request)

    if (response.data === true) {
        // Toast success
        toast.success('Thêm mới nhân viên thành công !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });
        setTimeout(function () {
            window.location.reload();
        }, 1500); // Chờ 3 giây trước khi reload
    }
    else {
        toast.error('Đã có lỗi xảy ra !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
}

export default EmployeeApi;
