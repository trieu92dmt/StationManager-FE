import { CarCompanyRoute, NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { CarCompanyDashboard, HomepageLayout } from 'components/UserLayout';
import LoginPage from 'features/auth/pages/LoginPage';
import UserLoginPage from 'features/auth/pages/UserLoginPage';
import UserRegisterPage from 'features/auth/pages/UserRegisterPage';
import CarCompanyDetail from 'features/carCompanyDetail';
import CarCompanyList from 'features/carCompanyList';
import CarCompanyRegister from 'features/CarCompanyRegister/CarCompanyRegister';
import SearchResultPage from 'features/searchResult';
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
      <Switch>
        <Route path="/login">
          <UserLoginPage />
        </Route>

        <Route path="/home">
          <HomepageLayout />
        </Route>

        <Route path="/search-result">
          <SearchResultPage/>
        </Route>

        <Route path="/register">
          <UserRegisterPage />
        </Route>

        <Route path="/car-company-list">
          <CarCompanyList />
        </Route>

        <Route path="/car-company-detail/:companyId">
          <CarCompanyDetail />
        </Route>

        <Route path="/car-company-register">
          <CarCompanyRegister />
        </Route>

        <Route path="/admin-login">
          <LoginPage />
        </Route>

        <CarCompanyRoute path="/company">
          <CarCompanyDashboard />
        </CarCompanyRoute>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
