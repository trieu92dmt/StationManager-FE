import { Box, Button, createTheme, Grid, Link, makeStyles, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { UserRegister } from 'models/user';
import React, { useState } from 'react';
import { baseURL } from 'utils';
import UserRegisterForm from '../components/UserRegisterForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    primaryColor: {
        color: 'rgb(76 175 80)',
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
        backgroundColor: 'rgb(76 175 80)',
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

const theme = createTheme()

const handleFormSubmit = (formValues: UserRegister) => {

}

const initialValues: UserRegister = {
    fullname: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
}

export default function UserRegisterPage() {
    const classes = useStyles();

    const [userRegister, setUserRegister]= useState<UserRegister>()

    return (
        <ThemeProvider theme={theme}>
            <Grid container className={classes.height}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    className={classes.backgroundImage}
                />
                <Grid item xs={12} sm={8} md={5}>
                    <UserRegisterForm initialValues={initialValues} onSubmit={handleFormSubmit}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
