import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { isTokenData } from '../../validators/loginValidators';
import { toggleLoginForm } from '../state/reducers/loginFormReducer';

import LogoutButton from './LogoutButton';
import ToggleLoginFormButton from './ToggleLoginFormButton';

const LoginBar = () => {
    const token = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();

    const toggleVisibility = () => {
        dispatch(toggleLoginForm());
    };

    if (isTokenData(token)) {
        return <LogoutButton />;
    } else {
        return <ToggleLoginFormButton toggleVisibility={toggleVisibility} />;
    }
};

export default LoginBar;