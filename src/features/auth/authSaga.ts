import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import loginApi from 'api/loginApi';
import { User } from 'models/user';
import { AxiosError } from 'axios';

function* handleLogin(payload: LoginPayload) {
  try {
    const user: User = yield call(loginApi.login, payload);
    localStorage.setItem('access_token', user.data.token);
    localStorage.setItem('userRole', user.data.role);
    localStorage.setItem('accountId', user.data.accountId);
    yield put(
      authActions.loginSuccess({
        data: user.data,
        isSuccess: user.isSuccess
      })
    );

    // redirect to admin page
    if (user.data.role === 'SysAdmin')
      yield put(push('/admin/dashboard'));
    // redirect to home page
    else yield put(push('/home'));
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      const errorMessage: string = error.response.data; // Lấy chuỗi thông báo lỗi từ response

      const err1 = 'Đăng nhập thất bại: Tài khoản không tồn tại.';
      const err2 = 'Đăng nhập thất bại: Mật khẩu không chính xác.';

      if (errorMessage.includes(err1)) {
        const loginError = new Error(err1);
        yield put(authActions.loginFailed(loginError));
      }
      else if (errorMessage.includes(err2)) {
        const loginError = new Error(err2);
        yield put(authActions.loginFailed(loginError));
      } else  {
        yield put(authActions.loginFailed(error));
      }
    } else {
      yield put(authActions.loginFailed(error));
    }
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.clear();//.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}