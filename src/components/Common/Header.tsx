import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },

  headerContainer: {
    backgroundColor: '#1a73e8',
  },
}));

export function Header() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.headerContainer}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Station Management Admin
          </Typography>

          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
