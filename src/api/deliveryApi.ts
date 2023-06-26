import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { toast } from 'react-toastify';
import { AddDeliveryRequest, DeliveryResponse, GetListDeliveryRequest, UpdateStatusDeliveryRequest } from 'models/carCompany/delivery/delivery';

const DeliveryApi = {

    getListDelivery(params: GetListDeliveryRequest): Promise<ApiSuccessResponse<DeliveryResponse[]>> {
        const url = '/CarCompany/Delivery/get-list-delivery';
        return axiosClient.post(url, params);
    },

    // getDetailTrip(params: string): Promise<ApiSuccessResponse<DetailTripResponse>> {
    //     const url = '/CarCompany/Trip/get-trip-detail';
    //     return axiosClient.get(url, { params: { tripId: params } });
    // },

    updateStatusDelivery(data: UpdateStatusDeliveryRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Delivery/update-status-delivery';
        return axiosClient.post(url, data);
    },

    addDelivery(data: AddDeliveryRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Delivery/add-delivery';
        return axiosClient.post(url, data);
    },

    // getSeatByCarNumber(params: string): Promise<ApiSuccessResponse<SeatDiagram>> {
    //     const url = '/CarCompany/CarManager/get-seat-by-car-number';
    //     return axiosClient.get(url, { params: { carNumber: params } });
    //   },

    // removeRoute(routeId: string): Promise<ApiSuccessResponse<boolean>> {
    //     const url = `/CarCompany/Route/remove-route/${routeId}`;
    //     return axiosClient.delete(url);
    //   },
}

export async function updateStatusDelivery(request: UpdateStatusDeliveryRequest) {
    const response = await DeliveryApi.updateStatusDelivery(request)

    if (response.data === true) {
        // Toast success
        toast.success('Nhận hàng thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000); // Chờ 2 giây trước khi reload
    }
    else {
        toast.error('Đã có lỗi xảy ra !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
}

export async function addDelivery(request: AddDeliveryRequest) {
    const response = await DeliveryApi.addDelivery(request)

    if (response.data === true) {
        // Toast success
        toast.success('Thêm mới đơn vận chuyển thành công !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
        setTimeout(function () {
            window.location.reload();
        }, 2000); // Chờ 2 giây trước khi reload
    }
    else {
        toast.error('Đã có lỗi xảy ra !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    }
}

export default DeliveryApi;
