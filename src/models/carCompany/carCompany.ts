export interface CarCompanyItemResponse {
    carCompanyId: string,
    image: string,
    carCompanyName: string,
    description: string,
    rate: number,
    rateCount: number,
    phoneNumber: string
}

export interface CarCompanyRegisterRequest {
    companyName: string,
    officeAddress: string,
    email: string,
    phoneNumber: string,
    phoneNumber2: string,
    description: string,
    packageCode: string
}
