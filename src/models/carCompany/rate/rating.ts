export interface CreateRatingRequest{
    senderId: string | null;
    carCompanyId: string | null;
    rate: number;
    content: string;
}