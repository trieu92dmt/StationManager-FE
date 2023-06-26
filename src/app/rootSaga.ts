import authSaga from 'features/auth/authSaga';
import userRegisterSaga from 'features/auth/userRegisterSaga';
import carCompanyInfoSaga from 'features/carCompanyInfo/carCompanyInfoSaga';
import citySaga from 'features/city/citySaga';
import provinceSaga from 'features/common/province/provinceSaga';
import counterSaga from 'features/counter/counterSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga(), citySaga(), provinceSaga(), userRegisterSaga(), 
             carCompanyInfoSaga()]);
}
