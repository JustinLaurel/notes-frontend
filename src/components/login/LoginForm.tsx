import React from 'react';
import { useField, useTimeout } from '../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/reducers/login';
import { baseMargins } from '../../utils/styles';
import { RootState } from '../../state/store';
import { hideLoginSpinner, showLoginSpinner, toggleLoginForm } from '../../state/reducers/loginForm';
import { LoginFormViewFields, TimeoutObject, TokenData } from '../../types';
import { isTokenData } from '../../validators/loginValidators';

import { Button, FormControl, Input, Spinner, useToast } from '@chakra-ui/react';
import { loginToasts as toasts } from '../../utils/toasts';

const LoginFormView = ({ handleLogin, username, password, showSpinner }: LoginFormViewFields) => {
    const inputStyle = {
        "size": "xs",
        "w": 150,
        "variant": "filled",
    };

    const buttonStyle = {
        "size": "xs",
        "bgColor": "blue.300",
        "display": "inline"
    };

    return (
        <FormControl
            as="form" 
            onSubmit={handleLogin}
            {...baseMargins}>
                username: <Input {...username} {...inputStyle} /> <br />
                password: <Input {...password} {...inputStyle}/>
                <div>
                    <Button {...buttonStyle}>login</Button>
                    <SpinnerView isVisible={showSpinner}/>
                </div>
        </FormControl>
    );
};

const SpinnerView = ({isVisible}: {isVisible: boolean}) => {
    const spinnerStyle = {
        "size": "sm",
        "verticalAlign": "middle",
        "margin": "7px"
    };

    return (
        isVisible 
            ? <Spinner {...spinnerStyle} />
            : null
    );
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const formVisible = useSelector((state: RootState) => state.loginForm.form);
    const spinnerVisible = useSelector((state: RootState) => state.loginForm.spinner);

    const username = useField('text');
    const password = useField('password');    

    const clearInputFields = () => {
        username.clearField();
        password.clearField();
    };

    const clearToastsAndSpinner = (timeout: TimeoutObject) => {
        timeout.clear();
        dispatch(hideLoginSpinner());
    };

    const notifyIfTimedOut = (timeout: TimeoutObject) => {
        const handleFailure = () => {
            toast(toasts.failed);
            dispatch(hideLoginSpinner());
        };

        timeout.set(handleFailure, 5000);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const timeout = useTimeout();

        new Promise((resolve) => {
            dispatch(showLoginSpinner());
            notifyIfTimedOut(timeout);

            const token = dispatch(login({
                username: username.value,
                password: password.value
            })) as unknown as TokenData;
            
            resolve(token);
        })
        .then((token) => {
            if (isTokenData(token)) {
                clearToastsAndSpinner(timeout);
                toast(toasts.success(token.name));
                clearInputFields();
                dispatch(toggleLoginForm());
            }
        })
        .catch((e) => {
            clearToastsAndSpinner(timeout);
            toast(toasts.error(e.message));
        });
    };

    return (
        <>
            {formVisible
                ? <LoginFormView 
                    handleLogin={handleLogin} 
                    username={username} 
                    password={password} 
                    showSpinner={spinnerVisible}/>
                : null}
        </>
    );
};

export default LoginForm;