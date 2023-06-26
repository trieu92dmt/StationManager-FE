import { Box, makeStyles } from '@material-ui/core';
import { Sidebar } from 'components/CarCompanyCommon';
import Header from 'components/UserCommon/Header';
import CompanyDashboard from 'features/carCompanyDashboard';
import CompanyInfo from 'features/carCompanyInfo';
import CarCompanyInfoEditPage from 'features/carCompanyInfo/pages/carCompanyInfoEdit';
import CarManager from 'features/carManager';
import DeliveryManager from 'features/deliveryManager';
import EmployeeManager from 'features/employeeManager';
import CompanyReport from 'features/report';
import RouteManager from 'features/routeManager';
import TicketManager from 'features/ticketManager';
import TripManager from 'features/tripManager';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    width: '100%',
    overflow: 'auto',
    backgroundColor: '#e5e7eb',
    padding: theme.spacing(2, 3),
  },
}));

export function CarCompanyDashboard() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/company/info" exact>
            <CompanyInfo />
          </Route>
          
          <Route path="/company/info/edit">
            <CarCompanyInfoEditPage />
          </Route>

          <Route path="/company/car-manager">
            <CarManager />
          </Route>

          <Route path="/company/employee-manager">
            <EmployeeManager />
          </Route>

          <Route path="/company/route-manager">
            <RouteManager />
          </Route>

          <Route path="/company/trip-manager">
            <TripManager />
          </Route>

          <Route path="/company/ticket-manager">
            <TicketManager />
          </Route>

          <Route path="/company/delivery-manager">
            <DeliveryManager />
          </Route>
          
          <Route path="/company/report">
            <CompanyReport />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
