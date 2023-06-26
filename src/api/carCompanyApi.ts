import { ApiSuccessResponse, CommonResponse, CommonResponse2 } from 'models';
import axiosClient from './axiosClient';
import { DetailCarCompanyByUserSideResponse, DetailCarCompanyResponse } from 'models/carCompany/detailCarCompany';
import { AddCarRequest, AddCarTypeRequest, CarResponse, DetailCar, UpdateCarRequest } from 'models/carCompany/car/car';
import { toast } from 'react-toastify';
import { CarCompanyItemResponse, CarCompanyRegisterRequest } from 'models/carCompany/carCompany';

export interface GetListCarNumberParam {
  keyword: string | null,
  accountId: string | null,
}

export interface GetListCarTypeParam {
  keyword: string | null,
  accountId: string | null,
}

export interface GetListCarParam {
  accountId: string | null,
  carNumber: string | null,
  carTypeCode: string | null,
}


const carCompanyApi = {
  getDetail(params: string): Promise<ApiSuccessResponse<DetailCarCompanyResponse>> {
    const url = '/CarCompany/CarCompany/get-detail-car-company';
    return axiosClient.get(url, { params: { accountId: params } });
  },

  getDetailByUserSide(params: string): Promise<ApiSuccessResponse<DetailCarCompanyByUserSideResponse>> {
    const url = '/CarCompany/CarCompany/get-detail-car-company-by-user-side';
    return axiosClient.get(url, { params: { carCompanyId: params } });
  },

  addCarCompany(data: CarCompanyRegisterRequest): Promise<ApiSuccessResponse<boolean>> {
    const url = '/CarCompany/CarCompany/car-company-register';
    return axiosClient.post(url, data);
  },

  update(data: Partial<DetailCarCompanyResponse>, newImage: File | null, newThumnail: File | null): Promise<ApiSuccessResponse<boolean>> {
    const url = `/CarCompany/CarCompany/update-car-company-info`;

    // Generate a random boundary string
    const boundary = `boundary-${Math.random().toString().substr(2)}`;

    // Create a new FormData object and append the data and image to it
    const formData = new FormData();
    formData.append("carCompanyId", data.carCompanyId ?? "");
    formData.append("carCompanyCode", data.carCompanyCode ?? "");
    formData.append("carCompanyName", data.carCompanyName ?? "");
    formData.append("email", data.email ?? "");
    formData.append("hotline", data.hotline ?? "");
    formData.append("phoneNumber", data.phoneNumber ?? "");
    formData.append("officeAddress", data.officeAddress ?? "");
    formData.append("image", data.image ?? "");
    formData.append("thumnail", data.thumnail ?? "");
    formData.append("description", data.description ?? "");
    // Append the SocialMediaResponses list to the FormData object
    if (data.socialMediaResponses)
      for (let i = 0; i < data.socialMediaResponses.length; i++) {
        formData.append("socialMediaResponses[" + i + "].socialMediaCode", data.socialMediaResponses[i].socialMediaCode);
        formData.append("socialMediaResponses[" + i + "].socialMediaName", data.socialMediaResponses[i].socialMediaName);
        formData.append("socialMediaResponses[" + i + "].link", data.socialMediaResponses[i].link);
      }
    if (newImage != null)
      formData.append("newImage", newImage);
    if (newThumnail != null)
      formData.append("newThumnail", newThumnail);

    // Set the request headers, including the boundary string
    const headers = {
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
    };
    return axiosClient.post(url, formData, { headers });
  },

  getListCarNumber(params: GetListCarNumberParam): Promise<ApiSuccessResponse<CommonResponse2[]>> {
    const url = '/Utilities/Common/list-car-number';
    return axiosClient.get(url, { params });
  },

  getListCarType(params: GetListCarTypeParam): Promise<ApiSuccessResponse<CommonResponse2[]>> {
    const url = '/Utilities/Common/list-cartype';
    return axiosClient.get(url, { params });
  },

  getListCar(params: GetListCarParam): Promise<ApiSuccessResponse<CarResponse[]>> {
    const url = '/CarCompany/CarManager/get-list-car';
    return axiosClient.post(url, params);
  },

  addCarType(data: AddCarTypeRequest): Promise<ApiSuccessResponse<boolean>> {
    const url = '/CarCompany/CarManager/add-car-type';
    return axiosClient.post(url, data);
  },

  addCar(data: AddCarRequest): Promise<ApiSuccessResponse<boolean>> {
    const url = '/CarCompany/CarManager/add-car';
    return axiosClient.post(url, data);
  },

  removeCar(carId: string): Promise<ApiSuccessResponse<boolean>> {
    const url = `/CarCompany/CarManager/remove-car/${carId}`;
    return axiosClient.delete(url);
  },

  getDetailCar(params: string): Promise<ApiSuccessResponse<DetailCar>> {
    const url = '/CarCompany/CarManager/get-detail-car';
    return axiosClient.get(url, { params: { carId: params } });
  },

  updateCar(data: UpdateCarRequest): Promise<ApiSuccessResponse<boolean>> {
    const url = '/CarCompany/CarManager/update-car';
    return axiosClient.post(url, data);
  },

  getListCarCompany(page: number): Promise<ApiSuccessResponse<CarCompanyItemResponse[]>> {
    const url = '/CarCompany/CarCompany/get-list-car-company';
    return axiosClient.get(url,{ params: { page: page } });
  },
};

export async function addCarCompany(request: CarCompanyRegisterRequest) {
  const response = await carCompanyApi.addCarCompany(request)

  if (response.data === true) {
    // Toast success
    toast.success('Đăng ký thành công !', {
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

export async function addCarType(request: AddCarTypeRequest) {
  const response = await carCompanyApi.addCarType(request)

  if (response.data === true) {
    // Toast success
    toast.success('Thêm loại xe thành công !', {
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

export async function updateCar(request: UpdateCarRequest) {
  const response = await carCompanyApi.updateCar(request)

  if (response.data === true) {
    // Toast success
    toast.success('Cập nhật xe thành công !', {
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

export default carCompanyApi;
