import { Avatar, Box, Button, CircularProgress, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { LockOutlined, StarOutline, Visibility, VisibilityOff } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';
import { useState } from 'react';
import PasswordField from 'components/FormFields/PasswordField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  cusbutton: {
    backgroundColor: 'rgb(76 175 80)',
    color: '#FFF'
  },

  label: {
    textAlign: 'center',
  },

  box: {
    padding: theme.spacing(3),
  },

  avatar: {
    margin: 'auto',
    marginBottom: '8px',
    backgroundColor: 'rgb(76 175 80)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền overlay
    zIndex: 9999, // Z-index để đảm bảo hiển thị trên các thành phần khác
  },
}));

const LoadingOverlay = () => {
  const classes = useStyles();

  return (
    <div className={classes.overlay}>
      <CircularProgress color="secondary" /> {/* Hiệu ứng loading */}
    </div>
  );
};

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);
  console.log(isLogging);

  const [form, setValues] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnchange = (e: any) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleLoginClick = () => {
    setIsLoading(true);
    // TODO: Get username + pwd from login form
    dispatch(
      authActions.login({
        username: form.username,
        password: form.password,
      })
    );
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.root}>
      {isLoading && <LoadingOverlay />}
      <Box className={classes.box}>
        <Avatar className={classes.avatar}>
            <LockOutlined />
        </Avatar>
        <Typography className={classes.label} variant="h5" component="h1">
          Admin Login
        </Typography>
        <Box component="form">
          <TextField margin="normal" fullWidth required id="username" label="Username" variant="outlined" name="username" onChange={handleOnchange}/>
          <PasswordField onChange={handleOnchange} name="password" />
        </Box>
        <Box mt={4}>
          <Button fullWidth className={classes.cusbutton} variant="contained" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Login
          </Button>
        </Box>
      </Box>
    </div>
  );
}
