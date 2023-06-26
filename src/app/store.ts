import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import cityReducer from 'features/city/citySlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from './rootSaga';
import provinceReducer from 'features/common/province/provinceSlice';
import registerReducer from 'features/auth/userRegisterSlice';
import carCompanyReducer from 'features/carCompanyInfo/carCompanyInfoSlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
  province: provinceReducer,
  userRegister: registerReducer,
  carCompanyInfo: carCompanyReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
