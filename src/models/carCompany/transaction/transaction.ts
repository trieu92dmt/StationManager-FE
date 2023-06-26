
export interface CreateZaloPayOrderRequest {
    amount: number,
    description: string,
    transactionType: string,
    email: string,
    phoneNumber: string
}

export interface CreateZaloPayOrderResponse{
    return_code: number,
    return_message: string,
    sub_return_code: number,
    sub_return_message: string,
    zp_trans_token: string,
    order_url: string,
    order_token: string
}

export interface SaveTransactionRequest{
    transactionType: string,
    price: number,
    email: string,
    phoneNumber: string
}