export interface GetRevenueReportRequest {
    accountId: string,
    startPoint: string,
    endPoint: string,
    dateFrom: string | null,
    dateTo: string | null,
    type: string,
}

export interface RevenueReportResponse {
    label: string,
    value: number,
}

export interface GetFrequencyReportRequest {
    accountId: string,
    startPoint: string,
    endPoint: string,
    dateFrom: string | null,
    dateTo: string | null,
}

export interface FrequencyReportResponse {
    label: string,
    value: number,
}
