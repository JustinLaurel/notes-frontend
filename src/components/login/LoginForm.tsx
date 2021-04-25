import React from 'react';
import { useField } from '../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/reducers/login';
import { baseMargins } from '../../utils/styles';
import { RootState } from '../../state/store';
import { toggleLoginForm } from '../../state/reducers/loginForm';
import { LoginFormViewFields, TokenData } from '../../types';
import { setNotification } from '../../state/reducers/notification';
import { isTokenData } from '../../validators/loginValidators';

import { Button, FormControl, Input } from '@chakra-ui/react';

const LoginFormView = ({ handleLogin, username, password }: LoginFormViewFields) => {
    const inputStyle = {
        "size": "xs",
        "w": 150,
        "variant": "filled",
    };

    const buttonStyle = {
        "size": "xs",
        "bgColor": "blue.300",
    };

    return (
        <FormControl as="form" onSubmit={handleLogin} {...baseMargins}>
            username: <Input {...username} {...inputStyle} /> <br />
            password: <Input {...password} {...inputStyle}/> <br />
            <Button {...buttonStyle}>login</Button>
        </FormControl>
    );
};

const LoginForm = () => {
    const dispatch = useDispatch();

    const loginFormVisible = useSelector((state: RootState) => state.loginFormVisible);
    const username = useField('text');
    const password = useField('password');    

    const clearInputFields = () => {
        username.clearField();
        password.clearField();
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        new Promise((resolve) => {
            dispatch(setNotification(`logging in...`, 50000));
            setTimeout(() => setNotification(`Login timed out, please try again`), 5000);
            const token = dispatch(login({
                username: username.value,
                password: password.value
            })) as unknown as TokenData;
            resolve(token);
        })
        .then((token) => {
            if (isTokenData(token)) {
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
        loginFormVisible
            ? <LoginFormView handleLogin={handleLogin} username={username} password={password} />
            : null
    );
};

export default LoginForm;