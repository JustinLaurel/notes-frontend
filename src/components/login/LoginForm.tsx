import React from 'react';
import { useField, Field } from '../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../state/reducers/loginReducer';
import { baseComponentStyle } from '../utils/styles';
import { RootState } from '../state/store';
import { toggleLoginForm } from '../state/reducers/loginFormReducer';

interface LoginFormViewFields {
    handleLogin: (e: React.FormEvent) => void;
    username: Field,
    password: Field,
}
const LoginFormView = ({ handleLogin, username, password }: LoginFormViewFields) => {
    return (
        <form onSubmit={handleLogin} style={baseComponentStyle}>
            username: <input {...username} /> <br />
            password: <input {...password} /> <br />
            <button>login</button>
        </form>
    );
};

const LoginForm = () => {
    const dispatch = useDispatch();

    const loginFormVisible = useSelector((state: RootState) => state.loginFormVisible);
    const username = useField('text');
    const password = useField('password');    

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({
            username: username.value,
            password: password.value
        }));
        username.clearField();
        password.clearField();
        dispatch(toggleLoginForm());
    };

    return (
        loginFormVisible
            ? <LoginFormView handleLogin={handleLogin} username={username} password={password} />
            : null
    );
};

export default LoginForm;