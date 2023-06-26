export interface CarResponse{
    carId: string,
    carNumber: string,
    carType: string,
    seatQuantity: number,
    description: string | null,
    createTime: string | null,
    feature: string
}

export type SeatType = "available" | "occupied" | "selected";

export interface Seat {
    columns: number;
    rows: number;
    levels: number;
    seatNumber: string;
    seatStatus: string | "";
    actived: boolean;
  }
  
  export interface SeatLayout {
    columns: number;
    rows: number;
    levels: number;
    seats: Seat[];
  }

export interface AddCarTypeRequest{
    accountId: string | null;
    carTypeName: string;
    columns: number;
    rows: number;
    levels: number;
    seats: Seat[];
}

export interface AddCarRequest{
    accountId: string | null;
    carNumber: string;
    carType: string | null;
    description: string;
}

export interface DetailCar{
    carId: string;
    carNumber: string;
    carTypeCode: string;
    carTypeName: string;
    description: string;
    columns: number;
    rows: number;
    levels: number;
    seats: Seat[];
}

export interface UpdateCarRequest{
    carId: string,
    carNumber: string,
    description: string,
    carTypeCode: string,
    seats: Seat[]
}