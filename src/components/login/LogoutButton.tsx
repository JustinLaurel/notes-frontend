import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginForm } from '../../state/reducers/loginForm';
import { getStoredToken, logout } from '../../state/reducers/login';
import { setNotification } from '../../state/reducers/notification';
import { RootState } from '../../state/store';
import { SubmitHandler } from '../../types';
import { baseMargins } from '../utils/styles';
import { Button } from '@chakra-ui/react';

const LogoutButtonView = ({ handleSubmit }: SubmitHandler) => {
    const buttonStyle = {
        ...baseMargins,
        "size": "xs",
        "fontSize": "12px",
        "borderRadius": "6px",
        "color": "black",
        "bg": "red.600",
        "_hover": { 
            bg: "red.800",
        },
    };

    return <Button onClick={handleSubmit} {...buttonStyle}>logout</Button>;
};

const LogoutButton = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.login);

    const notifyLogout = () => {
        const name = getStoredToken()?.name;
        if (name) dispatch(setNotification(`${name} logged out`));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(logout());
            dispatch(showLoginForm());
            notifyLogout();
        } catch(e) {
            dispatch(setNotification(`Error logging out: ${e.message}`));
            console.error(`Error: ${e.message}`);
        }
    };

    return (
        Object.keys(token).length === 0
            ? null
            : <LogoutButtonView handleSubmit={handleSubmit} />
    );
};

export default LogoutButton;