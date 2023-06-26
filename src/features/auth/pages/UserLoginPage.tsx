import { Avatar, Box, Button, Checkbox, CircularProgress, createTheme, FormControlLabel, Grid, Link, makeStyles, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { authActions } from '../authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { baseURL } from 'utils';
import styles from './styles.module.css'
import { FacebookProvider, LoginButton } from 'react-facebook';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { InitFacebookSDK } from 'features/Utils/initFacebookSDK';
import { GoogleSignInComponent } from '../components/GoogleSignInComponent ';
import PasswordField2 from 'components/FormFields/PasswordField2';
import { Alert } from '@material-ui/lab';

interface GoogleSignInComponentProps {
    loginSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    primaryColor: {
        color: '#1a73e8 !important',
    },

    height: {
        height: '100vh',
    },

    backgroundImage: {
        backgroundImage: 'url(https://anhdepfree.com/wp-content/uploads/2020/03/hinh-nen-thanh-pho.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    cusbutton: {
        backgroundColor: '#1a73e8 !important',
        color: '#FFF',
        width: 'fit-content',
        display: 'block',
        marginTop: '12px',
        marginBottom: '12px',
        margin: 'auto'
    },

    label: {
        textAlign: 'center',
    },

    box: {
        padding: theme.spacing(3),
    },

    avatar: {
        margin: '1',
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

const theme = createTheme()

const LoadingOverlay = () => {
    const classes = useStyles();

    return (
        <div className={classes.overlay}>
            <CircularProgress color="secondary" /> {/* Hiệu ứng loading */}
        </div>
    );
};

export default function UserLoginPage() {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const  [error, seterror] = useState(useAppSelector((state) => state.auth.error));

    const [form, setValues] = useState({
        username: "",
        password: "",
    });

    const handleOnchange = (e: any) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleLoginClick = () => {
        console.log('hello')
        setIsLoading(true);
        let hasError = false;
        setTimeout(() => {
            // Kiểm tra nếu không có lỗi và không có lỗi từ Redux state
            if (!hasError && !error) {
                // TODO: Get username + pwd from login form
                dispatch(
                    authActions.login({
                        username: form.username,
                        password: form.password,
                    })
                );
            } else {
                // Hiển thị thông báo lỗi
                console.log('Có lỗi xảy ra trong quá trình đăng nhập');
            }
        }, 1200);

        // Xử lý lỗi từ Redux state khi có lỗi xảy ra
        if (error) {
            hasError = true; // Đặt biến flag để báo hiệu có lỗi xảy ra
        }
    };

    const history = useHistory();
    const loginUtil = InitFacebookSDK();

    const handleFBLoginClick = () => {

        window.FB.login((response: any) => {
            if (response.status === 'connected') {
                console.log(response);
                history.push('/home');
            }

        }, { scope: 'public_profile' });
    };

    const [profile, setProfile] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    // Theo dõi thay đổi của biến isLoading và dừng lại nếu có lỗi xảy ra hoặc quá trình đăng nhập hoàn thành
    useEffect(() => {
        if (!isLoading || error) {
            setIsLoading(false);
        }
    }, [isLoading, error]);

    return (
        <ThemeProvider theme={theme}>
            {isLoading && <LoadingOverlay />}
            <Grid container className={classes.height}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    className={classes.backgroundImage}
                />
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        my={16}
                        mx={4}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                    >
                        <Typography component="h1" variant="h5">
                            Đăng nhập
                        </Typography>
                        <Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Tên đăng nhập"
                                name="username"
                                onChange={handleOnchange}
                                autoFocus
                            />
                            <PasswordField2
                                name="password"
                                onChange={handleOnchange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" className={classes.primaryColor} />}
                                label="Ghi nhớ đăng nhập"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleLoginClick}
                                className={classes.cusbutton}
                            >
                                Đăng nhập
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Quên mật khẩu?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href={baseURL + "/register"} variant="body2">
                                        {"Chưa có tài khoản? Đăng ký"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        {error && <Alert severity="error">{error.message}</Alert>}
                        {/* <Box className={styles.LoginOptionContainer}>
                            <GoogleSignInComponent
                                loginSuccess={function (response: GoogleLoginResponse | GoogleLoginResponseOffline): void {
                                    throw new Error('Function not implemented.');
                                }} />
                            <Button
                                className={styles.FacebookBtn}
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleFBLoginClick}
                            >
                                Facebook
                            </Button>
                        </Box> */}
                        <div id="status">
                        </div>
                    </Box>

                </Grid>
            </Grid>

            <div id="fb-root"></div>

            <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0&appId=1051208665855150&autoLogAppEvents=1" nonce="nYPEe5Ei"></script>

        </ThemeProvider>
    );
}

