import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { CreateRatingRequest } from 'models/carCompany/rate/rating';

const RatingApi = {
    createRating(params: CreateRatingRequest): Promise<ApiSuccessResponse<boolean>> {
        const url = '/Rate/Rate/create-rating';
        return axiosClient.post(url, params);
    },

    checkRatePermission(param1: string | null, param2: string | null): Promise<ApiSuccessResponse<boolean>> {
        const url = '/Rate/Rate/check-rate-permission';
        return axiosClient.get(url, { params: { accountId: param1, companyId: param2 } });
    }
}

export default RatingApi;
