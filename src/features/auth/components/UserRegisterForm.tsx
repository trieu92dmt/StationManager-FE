import { Box, Button, Link, Typography, makeStyles } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { UserRegister } from 'models/user'
import { useForm } from 'react-hook-form';
import { registerActions } from '../userRegisterSlice';
import { baseURL } from 'utils';

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
        backgroundImage: 'url(https://source.unsplash.com/random)',
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
}));

export interface UserRegisterForm {
    initialValues?: UserRegister;
    onSubmit?: (formValues: UserRegister) => void;
}

export default function UserRegisterForm({ initialValues, onSubmit }: UserRegisterForm) {
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const {
        control,
        handleSubmit
    } = useForm<UserRegister>({
        defaultValues: initialValues,

    })

    const handleFormSubmit = (formValues: UserRegister) => {
        console.log('Submit:', formValues);
        dispatch(
            registerActions.register(formValues)
        );
    }

    return (
        <Box
            my={8}
            mx={4}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <Typography component="h1" variant="h5">
                Đăng ký
            </Typography>
            <Box>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputField
                        name="fullname"
                        control={control}
                        label="Họ và tên" 
                        />
                    <InputField name="username" control={control} label="Tên đăng nhập" />
                    <InputField name="password" type='password' control={control} label="Mật khẩu" />
                    <InputField name="password-confirm" type='password' control={control} label="Xác nhận mật khẩu" />
                    <InputField name="email" control={control} label="Email" />
                    <InputField name="phoneNumber" control={control} label="Số điện thoại" />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.cusbutton}
                    >
                        Đăng ký
                    </Button>
                </form>
            </Box>
            <Link href={baseURL + "/login"} variant="body2">
                {"Đã có tài khoản? Đăng nhập"}
            </Link>
        </Box>
    )
}