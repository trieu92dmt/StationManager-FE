export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}


export interface CommonResponse{
  title: string;
  value: string;
}

export interface CommonResponse2{
  key: string;
  value: string;
}

export interface CommonResponse3{
  label: string;
  value: string;
}

export interface CommonResponse4{
  key: string;
  value: string;
  group: string;
}

export interface ApiSuccessResponse<T>{
  isSuccess: boolean;
  code: number;
  data: T;
  message: string;
  resultsCount: number,
  recordsTotal: number,
  pagesCount: number,
}

export interface GetListTripByRouteIdRequest{
  routeId: string | null,
  startDate: string | null,
}

export interface PagingQuery{
  pageSize: number,
  pageIndex: number,
  orderBy: string,
  orderByDesc: string,
}