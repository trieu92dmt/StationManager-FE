import { PagingQuery } from "models/common";

export interface AddTripRequest {
    routeId: string | null;
    startPoint: string;
    endPoint: string;
    startDate: string;
    carNumber: string;
    driver: string;
    description: string;
    ticketPrice: number;
}

export interface UpdateTripRequest {
    tripId: string;
    startDate: string | null;
    carNumber: string;
    driver: string;
    description: string;
}



export interface GetListTripRequest {
    accountId: string | null;
    startPoint: string;
    endPoint: string;
    startDate: string | null;
    carNumber: string;
    carType: string;
    driver: string;
}


export interface TripResponse {
    tripId: string;
    tripCode: string;
    startPoint: string;
    endPoint: string;
    carNumber: string;
    startDate: string;
    driver: string;
    carType: string;
    description: string;
    feature: string;
    isHaveEmptySeat: boolean;
    seatEmpty: number;
    seatQuantity: number;
}

export interface DetailTripResponse{
    tripId: string;
    tripCode: string;
    route: string;
    startPoint: string;
    endPoint: string;
    ticketPrice: number;
    carNumber: string;
    startDate: string;
    driver: string;
    driverName: string;
    carType: string;
    carDetail: CarDetail;
    description: string;
    feature: string;
    seats: Seat[];
}

export interface Seat {
    seatId: string;
    columns: number;
    rows: number;
    levels: number;
    seatNumber: string;
    seatStatus: string | "";
    status: string;
    actived: boolean;
  }

  export interface CarDetail {
    columns: number;
    rows: number;
    levels: number;
  }

  export interface SeatDiagram {
    columns: number;
    rows: number;
    levels: number;
    seats: Seat[];
  }

  export interface SearchTripRequest {
    paging: PagingQuery,
    startPoint: string,
    endPoint: string,
    startDate: string | null,
    priceFrom: number,
    priceTo: number,
    emptySeat: number,
    isFirstRow: boolean | null,
    isMiddleRow: boolean | null,
    isLastRow: boolean | null,
    ratePointFrom: number,
    listCarCompany: number[]
  }

  export interface TripSearchResponse{
     stt: number,
     tripId: string,
     companyId: string,
     companyName: string,
     ratePoint: number,
     rateCount: number,
     ticketPrice: number,
     seatTotal: number,
     emptySeat: number,
     carType: string,
     startDate: string,
     startTime: string,
     startPoint: string,
     endTime: string,
     endPoint: string,
     image: string,
  }

export interface TripDataResponse{
  seatDiagram: SeatDiagram,
  ticketDatas: TicketData[]
}

export interface TicketData{
  ticketCode: string,
  name: string,
  phoneNumber: string,
  email: string,
  status: string,
  createTime: string,
  price: number,
  seats: string
}