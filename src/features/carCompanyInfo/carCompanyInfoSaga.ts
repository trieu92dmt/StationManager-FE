import { PayloadAction } from '@reduxjs/toolkit';
import carCompanyApi from 'api/carCompanyApi';
import { ApiSuccessResponse } from 'models';
import { DetailCarCompanyResponse } from 'models/carCompany/detailCarCompany';
import { call, put, takeLatest } from 'redux-saga/effects';
import { carCompanyInfoActions } from './carCompanyInfoSlice';

function* fetchCarCompanyInfo(action: PayloadAction<string>) {
  try {
    const response: ApiSuccessResponse<DetailCarCompanyResponse> = yield call(carCompanyApi.getDetail, action.payload);
    yield put(carCompanyInfoActions.fetchCarCompanyInfoSuccess(response));
  } catch (error) {
    console.log('Failed to fetch car company info', error);
    yield put(carCompanyInfoActions.fetchCarCompanyInfoFailed());
  }
}

export default function* carCompanyInfoSaga() {
  yield takeLatest(carCompanyInfoActions.fetchCarCompanyInfo.type, fetchCarCompanyInfo);
}
