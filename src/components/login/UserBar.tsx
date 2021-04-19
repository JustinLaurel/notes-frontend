import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { isTokenData } from '../../validators/loginValidators';
import { toggleLoginForm } from '../../state/reducers/loginForm';

import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

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

    const toggleVisibility = () => {
        dispatch(toggleLoginForm());
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
        return <LoginButton toggleVisibility={toggleVisibility} />;
    }
};

export default UserBar;