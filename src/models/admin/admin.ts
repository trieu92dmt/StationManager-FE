import { boolean, number, string } from "yup"

export interface SearchCarCompanyCommand {
    companyName: string,
    email: string,
    hotline: string,
    phoneNumber: string,
    status: string
}

export interface CarCompanyResponse {
    stt: number,
    carCompanyId: string,
    carCompanyCode: number,
    carCompanyName: string,
    username: number,
    email: string,
    hotline: string,
    phoneNumber: string,
    officeAddress: string,
    description: string,
    createTime: string,
    status: string,
    feature: string
}

export interface ApproveStatusCarCompanyCommand {
    carCompanyId: string
}

export interface ChangeStatusCarCompanyCommand {
    carCompanyId: string,
    status: string
}

export interface CarCompanyDetailResponse {
    carCompanyId: string,
    //Mã nhà xe
    carCompanyCode: number,
    //Tên nhà xe
    carCompanyName: string,
    //Tên đăng nhập
    username: string,
    //Email
    email: string,
    //Hotline
    hotline: string,
    //Số điện thoại
    phoneNumber: string,
    //Địa chỉ văn phòng
    officeAddress: string,
    //Mô tả
    description: string,
    //Ngày tạo
    createTime: string,
    //Trạng thái
    status: string,
    //Số lượng xe đang quản lý
    carQuantity: number,
    //Số lượng tuyến đang quản lý
    routeQuantity: number,
    //Số lượng chuyến xe cao nhất/ngày
    maxTripQuantity: number,
    //Ngày hết hạn
    expireDate: string,
    //Các gói đã đăng ký
    packages: Package[],
    //Danh sách tuyến xe
    routes: Route[],
    //Danh sách các đánh giá
    rates: Rate[]
}

export interface Package {
    stt: number,
    //Id gói
    packageId: string,
    //Mã gói
    packageCode: string,
    //Tên gói
    packageName: string,
    //Thời hạn
    duration: number,
    //Giá
    price: number,
    //Số lượng xe giới hạn
    carLimit: number,
    //Số lượng tuyến giới hạn
    routeLimit: number,
    //Số lượng chuyến/1 ngày
    tripPerDay: number,
    //Ngày đăng ký
    createTime: string
}

export interface Route {
    stt: number,
    //Id tuyến
    routeId: string,
    //Mã tuyến
    routeCode: string,
    //Điểm đi
    startPoint: string,
    //Điểm đến
    endPoint: string,
    //Số chuyến đã thực hiện
    tripQuantity: number,
    //Ngày tạo
    createTime: string,
    //Trạng thái
    active: boolean
}

export interface Rate {
    stt: number,
    //Id rate
    rateId: string,
    //Điểm đánh giá
    ratePoint: number,
    //Nội dung
    content: string,
    //Ngày đánh giá
    createTime: string
}