export interface GetListRouteRequest {
    accountId: string | null;
    startPoint: string;
    endPoint: string;
}

export interface RouteResponse {
    routeId: string;
    routeCode: string;
    startPoint: string;
    endPoint: string;
    distance: number;
    description: string;
    feature: string;
}

export interface AddRouteRequest {
    accountId: string | null;
    startPoint: string;
    endPoint: string;
    distance: number;
    description: string
}

export interface DetailRouteResponse {
    routeId: string;
    routeCode: string;
    startPoint: string;
    endPoint: string;
    distance: number;
    description: string;
}

export interface UpdateRouteRequest {
    routeId: string | null;
    distance: number;   
    description: string
}