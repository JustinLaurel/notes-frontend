import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { isTokenData } from '../validators/loginValidators';
import { toggleLoginForm, toggleSignupForm } from '../state/reducers/views';

import LogoutButton from './login/LogoutButton';
import LoginButton from './login/LoginButton';
import SignupButton from './signup/SignupButton';

const NameView = ({ name }: { name: string }) => {
    const spacing = {
        'display': 'inline',
        'marginLeft': '2px',
    };

    return (
        <p style={spacing}>logged in as {name}</p>
    );
};

const UserBar = () => {
    const token = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();

    const toggleLogin = () => {
        dispatch(toggleLoginForm());
    };

    const toggleSignup = () => {
        dispatch(toggleSignupForm());
    };

    const inline = {
        'display': 'inline',
        'fontSize': '0.9em',
        'fontStyle': 'italic',
        'wordSpacing': '-0.1em'
    };

    if (isTokenData(token)) {
        return (
            <div style={inline}>
                <LogoutButton />
                <NameView name={token.name} />
            </div>
        );
    } else {
        return (
            <div style={inline}>
                <LoginButton toggleVisibility={toggleLogin} />
                <SignupButton toggleVisibility={toggleSignup} />
            </div>
        );
    }
};

export default UserBar;