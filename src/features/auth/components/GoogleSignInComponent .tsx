import React, { FunctionComponent, useState } from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import styles from '../pages/styles.module.css'

interface GoogleSignInComponentProps {
    loginSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
}

export const GoogleSignInComponent: FunctionComponent<GoogleSignInComponentProps> = ({ loginSuccess }) => {

    const [loginFailed, setLoginFailed] = useState<boolean>();

    return (
        <GoogleLogin
            clientId="542554332153-sm3jptbul09u3bvqb41mvc510qtv77lf.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={loginSuccess}
            onFailure={(response: any) => {
                setLoginFailed(true);
            }}
            cookiePolicy="single_host_origin"
            responseType="code,token"
            render={(renderProps) => (
                <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={styles.GoogleBtn} // Áp dụng lớp CSS tùy chỉnh
                >
                    GOOGLE
                </button>
            )}
        />
    )
};