export interface EmployeeResponse {
    employeeId: string,
    employeeCode: number,
    employeeName: string,
    position: string,
    phoneNumber: string,
    email: string,
    description: string,
    feature: string
}

export interface DetailEmployeeResponse {
    employeeId: string,
    employeeCode: number,
    employeeName: string,
    positionCode: string,
    position: string,
    phoneNumber: string,
    email: string,
    description: string,
}


export interface UpdateEmployeeRequest {
    employeeId: string | null,
    employeeName: string,
    positionCode: string
    phoneNumber: string,
    email: string,
    description: string
}

export interface AddEmployeeRequest {
    accountId: string | null;
    employeeName: string,
    positionCode: string
    phoneNumber: string,
    email: string,
    description: string
}