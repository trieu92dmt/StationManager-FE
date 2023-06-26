import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar } from 'components/Common';
import AdminAccountManager from 'features/admin/accountManager';
import AdminCarCompanyDetail from 'features/admin/carCompanyDetail';
import AdminCarCompanyManager from 'features/admin/carCompanyManager';
import AdminCarCompanyCreate from 'features/admin/carCompanyManager/components/companyCreate';
import StudentFeature from 'features/student';
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
    backgroundColor: '#e5e7eb',
    padding: theme.spacing(2, 3),
    width: '100%',
    overflow: 'auto',
  },
}));

export function AdminLayout() {
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
          <Route path="/admin/car-company-manager" exact>
            <AdminCarCompanyManager />
          </Route>

          <Route path="/admin/car-company-manager/create">
            <AdminCarCompanyCreate />
          </Route>

          <Route path="/admin/car-company-manager/detail/:carCompanyId">
            <AdminCarCompanyDetail/>
          </Route>

          <Route path="/admin/permission/accounts" exact>
            <AdminAccountManager />
          </Route>

          <Route path="/admin/students">
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
