import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginForm } from '../../state/reducers/loginForm';
import { getStoredToken, logout } from '../../state/reducers/login';
import { setNotification } from '../../state/reducers/notification';
import { RootState } from '../../state/store';
import { SubmitHandler } from '../../types';

const LogoutButtonView = ({ handleSubmit }: SubmitHandler) => {
    const buttonStyle = {
        "display": "inline"
    };

    return <button onClick={handleSubmit} style={buttonStyle}>logout</button>;
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