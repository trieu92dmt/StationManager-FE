import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ApiSuccessResponse } from 'models';
import { DetailCarCompanyResponse } from 'models/carCompany/detailCarCompany';

export interface CarCompanyInfoState {
  loading: boolean;
  data: DetailCarCompanyResponse;
}

const initialState: CarCompanyInfoState = {
  loading: false,
  data: {
    carCompanyCode: "",
    carCompanyId: "",
    carCompanyName: "",
    email: "",
    hotline: "",
    officeAddress: "",
    phoneNumber: "",
    image: "",
    newImage: null,
    description: "",
    thumnail: "",
    rate: 0,
    rateCount: 0,
    newThumnail: null,
    socialMediaResponses: [],
    ratingList: []
  },
};

const carCompanyInfoSlice = createSlice({
  name: 'carCompanyInfo',
  initialState,
  reducers: {
    fetchCarCompanyInfo(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchCarCompanyInfoSuccess(state, action: PayloadAction<ApiSuccessResponse<DetailCarCompanyResponse>>) {
      state.loading = false;
      state.data = action.payload.data;
    },
    fetchCarCompanyInfoFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const carCompanyInfoActions = carCompanyInfoSlice.actions;

// Selectors
export const selectCarCompanyInfo = (state: RootState) => state.carCompanyInfo.data;

// Reducer
const carCompanyReducer = carCompanyInfoSlice.reducer;
export default carCompanyReducer;
