import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { ActionTicketRequest, TicketResponse } from 'models/carCompany/ticket/ticket';
import { toast } from 'react-toastify';

const TicketApi = {

    getListTicket(params: string | null): Promise<ApiSuccessResponse<TicketResponse[]>> {
        const url = '/CarCompany/Ticket/get-list-ticket';
        return axiosClient.get(url, { params: { phoneNumber: params } });
    },

    // getDetailTrip(params: string): Promise<ApiSuccessResponse<DetailTripResponse>> {
    //     const url = '/CarCompany/Trip/get-trip-detail';
    //     return axiosClient.get(url, { params: { tripId: params } });
    // },

    actionTicket(data: ActionTicketRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/CarCompany/Ticket/action-ticket';
        return axiosClient.post(url, data);
    },

    // addTrip(data: AddTripRequest): Promise<ApiSuccessResponse<boolean>> {
    //     const url = '/CarCompany/Trip/add-trip';
    //     return axiosClient.post(url, data);
    // },

    // getSeatByCarNumber(params: string): Promise<ApiSuccessResponse<SeatDiagram>> {
    //     const url = '/CarCompany/CarManager/get-seat-by-car-number';
    //     return axiosClient.get(url, { params: { carNumber: params } });
    //   },

    // removeRoute(routeId: string): Promise<ApiSuccessResponse<boolean>> {
    //     const url = `/CarCompany/Route/remove-route/${routeId}`;
    //     return axiosClient.delete(url);
    //   },
}

export async function actionTicket(request: ActionTicketRequest, messageSuccess: string) {
    const response = await TicketApi.actionTicket(request)

    if (response.data === true) {
        // Toast success
        toast.success(messageSuccess, {
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

// export async function addTrip(request: AddTripRequest) {
//     const response = await TripApi.addTrip(request)

//     if (response.data === true) {
//         // Toast success
//         toast.success('Thêm mới chuyến xe thành công !', {
//             position: toast.POSITION.TOP_RIGHT,
//             autoClose: 3000,
//         });
//         setTimeout(function () {
//             window.location.reload();
//         }, 3000); // Chờ 3 giây trước khi reload
//     }
//     else {
//         toast.error('Đã có lỗi xảy ra !', {
//             position: toast.POSITION.TOP_RIGHT,
//             autoClose: 3000,
//         });
//     }
// }

export default TicketApi;
