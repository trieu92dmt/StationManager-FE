import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { provinceAction } from "./provinceSlice";
import { ApiSuccessResponse, District, ListParams } from "models";
import provinceApi from "api/provinceApi";


function* fecthProvinceList(action: PayloadAction<ListParams>){
    try {
        const response: ApiSuccessResponse<District[]> = yield call(provinceApi.getAll, action.payload)
        yield put(provinceAction.fetchProvinceListSuccess(response))
    } catch (error) {
        console.log('Fail to load province list', error)
        yield put(provinceAction.fetchProvinceListFailed(''))
    }
}

export default function* provinceSaga(){
    //watch fecth province action
    yield takeLatest(provinceAction.fetchProvinceList, fecthProvinceList)
}