import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoginForm } from '../state/reducers/loginFormReducer';
import { logout } from '../state/reducers/loginReducer';
import { RootState } from '../state/store';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.login);

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        dispatch(showLoginForm());
    };

    const buttonStyle = {
        "display": "inline"
    };

    return (
        Object.keys(token).length === 0
            ? null
            : <button onClick={handleLogout} style={buttonStyle}>logout</button>
    );
};

export default LogoutButton;