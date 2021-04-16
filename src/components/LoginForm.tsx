import React from 'react';
import { useField, Field } from './utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './state/reducers/loginReducer';
import { RootState } from './state/store';

interface LoginFormViewFields {
    handleLogin: (e: React.FormEvent) => void;
    username: Field,
    password: Field
}
const LoginFormView = ({ handleLogin, username, password }: LoginFormViewFields) => {
    return (
        <form onSubmit={handleLogin}>
            username: <input {...username} /> <br />
            password: <input {...password} /> <br />
            <button>login</button>
        </form>
    );
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const username = useField('text');
    const password = useField('password');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({
            username: username.value,
            password: password.value
        }));
    };

    const token = useSelector((state: RootState) => state.login);

    return (
        Object.keys(token).length === 0
            ? <LoginFormView handleLogin={handleLogin} username={username} password={password} />
            : null
    );
};

export default LoginForm;