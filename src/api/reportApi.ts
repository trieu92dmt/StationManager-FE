import { ApiSuccessResponse } from 'models';
import axiosClient from './axiosClient';
import { FrequencyReportResponse, GetFrequencyReportRequest, GetRevenueReportRequest, RevenueReportResponse } from 'models/carCompany/report/report';

const ReportApi = {
    getRevenueReport(params: GetRevenueReportRequest): Promise<ApiSuccessResponse<RevenueReportResponse[]>> {
        const url = '/CarCompany/Report/revenue-report';
        return axiosClient.post(url, params);
    },

    getFrequencyReport(params: GetFrequencyReportRequest): Promise<ApiSuccessResponse<FrequencyReportResponse[]>> {
        const url = '/CarCompany/Report/frequency-report';
        return axiosClient.post(url, params);
    }
}

export default ReportApi;
