import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { toast } from 'react-toastify';
import { AddRouteRequest } from 'models/carCompany/route/route';
import { AddTripRequest, DetailTripResponse, GetListTripRequest, SearchTripRequest, SeatDiagram, TripDataResponse, TripResponse, TripSearchResponse, UpdateTripRequest } from 'models/carCompany/trip/trip';

const TripApi = {

    getListTrip(params: GetListTripRequest): Promise<ApiSuccessResponse<TripResponse[]>> {
        const url = '/CarCompany/Trip/get-list-trip';
        return axiosClient.post(url, params);
    },

    getDetailTrip(params: string): Promise<ApiSuccessResponse<DetailTripResponse>> {
        const url = '/CarCompany/Trip/get-trip-detail';
        return axiosClient.get(url, { params: { tripId: params } });
    },

    getTripData(params: string): Promise<ApiSuccessResponse<TripDataResponse>> {
        const url = '/CarCompany/Trip/get-trip-data';
        return axiosClient.get(url, { params: { tripId: params } });
    },

    updateTrip(data: UpdateTripRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Trip/update-trip';
        return axiosClient.post(url, data);
    },

    addTrip(data: AddTripRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Trip/add-trip';
        return axiosClient.post(url, data);
    },

    getSeatByCarNumber(params: string): Promise<ApiSuccessResponse<SeatDiagram>> {
        const url = '/CarCompany/CarManager/get-seat-by-car-number';
        return axiosClient.get(url, { params: { carNumber: params } });
      },

    // removeRoute(routeId: string): Promise<ApiSuccessResponse<boolean>> {
    //     const url = `/CarCompany/Route/remove-route/${routeId}`;
    //     return axiosClient.delete(url);
    //   },

    searchTrip(params: SearchTripRequest): Promise<ApiSuccessResponse<TripSearchResponse[]>> {
        const url = '/CarCompany/Trip/search-trip';
        return axiosClient.post(url, params);
    },
}

export async function updateTrip(request: UpdateTripRequest) {
    const response = await TripApi.updateTrip(request)

    if (response.data === true) {
        // Toast success
        toast.success('Cập nhật thông tin chuyến xe !', {
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

export async function addTrip(request: AddTripRequest) {
    const response = await TripApi.addTrip(request)

    if (response.data === true) {
        // Toast success
        toast.success('Thêm mới chuyến xe thành công !', {
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

export default TripApi;
