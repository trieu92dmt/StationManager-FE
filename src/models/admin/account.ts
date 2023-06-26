export interface SearchAccountCommand{
    username: string,
    fullname: string,
    active: boolean | null,
    role: string | null
}

export interface AccountResponse{
    stt: number,
    accountId: string,
    username: string,
    fullName: string,
    active: boolean | null,
    role: string,
    feature: string
}

export interface UpdateAccountCommand{
    accountId: string,
    active: boolean,
}