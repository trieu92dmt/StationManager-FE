import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { CreateZaloPayOrderRequest, CreateZaloPayOrderResponse, SaveTransactionRequest } from 'models/carCompany/transaction/transaction';

const transactionApi = {
  createZaloPayOrder(params: CreateZaloPayOrderRequest): Promise<ApiSuccessResponse<CreateZaloPayOrderResponse>> {
    const url = '/Transaction/Order/create-zalopay-order';
    return axiosClient.post(url, params);
  },

  saveTransaction(params: SaveTransactionRequest): Promise<ApiSuccessResponse<boolean>> {
    const url = '/Transaction/Order/save-transaction';
    return axiosClient.post(url, params);
  },
};

export default transactionApi;
