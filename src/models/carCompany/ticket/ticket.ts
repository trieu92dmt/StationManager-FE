export interface ActionTicketRequest{
    tripId: string,
    userId: string | null,
    name: string,
    phoneNumber: string,
    email: string,
    price: number,
    status: string,
    seats: string[]
}

export interface TicketResponse{
    ticketId: string,
    ticketCode: string,
    status: string,
    price: number,
    bookDate: string,
    name: string,
    phoneNumber: string,
    email: string,
    feature: string,
}