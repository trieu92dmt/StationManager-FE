import { push } from 'connected-react-router';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { UserRegister } from 'models/user';
import userApi from 'api/userApi';
import { registerActions } from './userRegisterSlice';
import { ApiSuccessResponse } from 'models';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleRegister(payload: UserRegister) {
  try {
    console.log("Call api register")
    const registerResponse: ApiSuccessResponse<boolean> = yield call(userApi.register, payload);
    yield put(
      registerActions.registerSuccess(registerResponse)
    );

    // redirect to login page
    yield put(push('/login'));
  } catch (error) {
    yield put(registerActions.registerFailed(error));
  }
}

export default function* userRegisterSaga() {  
    const action: PayloadAction<UserRegister> = yield take(registerActions.register.type);
    yield fork(handleRegister, action.payload);
  }