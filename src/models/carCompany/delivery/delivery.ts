export interface AddDeliveryRequest{
    accountId: string,
    tripId: string,
    sender: string,
    receiver: string,
    phoneNumber: string,
    email: string,
    address: string,
    isShipAtHome: boolean,
    cost: number,
}

export interface GetListDeliveryRequest{
    routeId: string | null,
    receiver: string,
    phoneNumber: string,
    email: string,
    status: string
}

export interface DeliveryResponse{
    deliveryId: string,
    deliveryCode: string,
    tripInfo: string,
    sender: string,
    receiver: string,
    phoneNumber: string,
    email: string,
    address: string,
    isShipAtHome: boolean,
    cost: number,
    status: string,
    feature: string
}

export interface UpdateStatusDeliveryRequest{
    deliveryId: string
}