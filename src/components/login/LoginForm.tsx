import React from 'react';
import { useField, useTimeout } from '../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/reducers/login';
import { baseMargins } from '../../utils/styles';
import { RootState } from '../../state/store';
import { hideLoginSpinner, showLoginSpinner, toggleLoginForm } from '../../state/reducers/loginForm';
import { LoginFormViewFields, TimeoutObject, TokenData } from '../../types';
import { setNotification } from '../../state/reducers/notification';
import { isTokenData } from '../../validators/loginValidators';

import { Button, FormControl, Input, Spinner } from '@chakra-ui/react';

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
                password: <Input {...password} {...inputStyle}/> <br />
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

    const formVisible = useSelector((state: RootState) => state.loginForm.form);
    const spinnerVisible = useSelector((state: RootState) => state.loginForm.spinner);

    const username = useField('text');
    const password = useField('password');    

    const clearInputFields = () => {
        username.clearField();
        password.clearField();
    };

    const notifyIfFailed = (timeout: TimeoutObject) => {
        const dispatches = () => {
            dispatch(setNotification(`Login timed out, please try again`));
            dispatch(hideLoginSpinner());
        };
        timeout.set(dispatches, 5000);
    };

    // const notifyIfFailed = (timeout: {
    //     set: (func: unknown, timeout: number) => void,
    //     clear: () => void;
    // }) => {
    //     const dispatches = () => {
    //         dispatch(setNotification(`Login timed out, please try again`));
    //         dispatch(hideLoginSpinner());
    //     };
    //     timeout.set(dispatches, 5000);
    // };


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const timeout = useTimeout();

        new Promise((resolve) => {
            dispatch(showLoginSpinner());
            notifyIfFailed(timeout);

            const token = dispatch(login({
                username: username.value,
                password: password.value
            })) as unknown as TokenData;
            
            resolve(token);
        })
        .then((token) => {
            if (isTokenData(token)) {
                timeout.clear();
                dispatch(hideLoginSpinner());
                dispatch(setNotification(`${token.name} logged in`));
                clearInputFields();
                dispatch(toggleLoginForm());
            }
        })
        .catch((e) => {
            dispatch(setNotification(`${e.message}`, 5000));
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