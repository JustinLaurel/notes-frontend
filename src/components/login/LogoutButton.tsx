import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginForm } from '../../state/reducers/userFormViews';
import { getStoredToken, logout } from '../../state/reducers/login';
import { RootState } from '../../state/store';
import { SubmitHandler } from '../../types';

import { Button, useToast } from '@chakra-ui/react';
import { logoutToasts as toasts } from '../../utils/toasts/login';
import { clearNotes } from '../../state/reducers/notes';

const LogoutButtonView = ({ handleSubmit }: SubmitHandler) => {
    const buttonStyle = {
        "size": "xs",
        "fontSize": "12px",
        "borderRadius": "6px",
        "color": "black",
        "bg": "red.500",
        "_hover": { 
            bg: "red.800",
            color: "white"
        },
    };

    return <Button onClick={handleSubmit} {...buttonStyle}>logout</Button>;
};

const LogoutButton = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const token = useSelector((state: RootState) => state.login);

    const notifyLogout = (name: string | undefined) => {
        if (name) toast(toasts.success(name));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const name = getStoredToken()?.name;
            dispatch(logout());
            dispatch(showLoginForm());
            notifyLogout(name);
            dispatch(clearNotes());
        } catch(e) {
            toast(toasts.failed((e as Error).message));
        }
    };

    return (
        Object.keys(token).length === 0
            ? null
            : <LogoutButtonView handleSubmit={handleSubmit} />
    );
};

export default LogoutButton;