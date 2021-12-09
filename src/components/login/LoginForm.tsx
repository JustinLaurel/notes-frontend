import React from 'react';
import { useField, useTimeout } from '../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../state/reducers/login';
import { RootState } from '../../state/store';
import { hideLoginSpinner, showLoginSpinner, toggleLoginForm } from '../../state/reducers/userFormViews';
import { LoginFormViewFields, TimeoutObject, TokenData } from '../../types';
import { isTokenData } from '../../validators/loginValidators';

import { loginToasts as toasts } from '../../utils/toasts/login';
import { initializeNotes } from '../../state/reducers/notes';

import {
    Box,
    Button, 
    FormControl, 
    Input, 
    Spinner, 
    useToast, 
    InputGroup,
    InputLeftElement,
    chakra,
    Stack,
} from '@chakra-ui/react';

import { FaUserAlt, FaLock } from 'react-icons/fa';

const LoginFormView = ({ handleLogin, username, password, showSpinner }: LoginFormViewFields) => {
    const inputStyle = {
        "size": "sm",
        "w": 200,
        "variant": "filled",
        "borderRadius": "xl",
    };

    const buttonStyle = {
        "size": "xs",
        "bgColor": "blue.300",
        "display": "inline"
    };

    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);

    return (
        <FormControl as="form" onSubmit={handleLogin}>
            <Stack spacing={0.5}>
                <InputGroup {...inputStyle}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CFaUserAlt />} />
                    <Input {...username} {...inputStyle} placeholder='username' /> <br />
                </InputGroup>
                <InputGroup {...inputStyle}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CFaLock />} />
                    <Input {...password} {...inputStyle} placeholder='password' />
                </InputGroup>
                <Box>
                    <Button {...buttonStyle}>login</Button>
                    <SpinnerView isVisible={showSpinner}/>
                </Box>
            </Stack>
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

    const formVisible = useSelector((state: RootState) => state.userFormViews.loginForm);
    const spinnerVisible = useSelector((state: RootState) => state.userFormViews.loginSpinner);

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
                dispatch(initializeNotes());
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