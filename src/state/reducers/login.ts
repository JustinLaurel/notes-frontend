import { TokenData, ActionPayload } from "../../types";
import { parseCredentials, parseTokenData, isTokenData } from "../../validators/loginValidators";
import { AppDispatch } from "../store";
import loginService from '../../services/loginService';

const reducer = (state = {}, { type, payload }: ActionPayload) => {
    const localStorage = window.localStorage;

    switch(type) {
        case 'login/init': {
            if (isTokenData(payload)) return {...payload};
            return {...state};
        }
        case 'login/storeToken': {
            if (isTokenData(payload)) {
                localStorage.setItem('tokenData', JSON.stringify(payload));
                return {...payload};
            } else {
                console.error(`Missing or invalid token after login, cannot set to localStorage`);
            }
            return {...state};
        }
        case 'login/logout': {
            localStorage.removeItem('tokenData');
            return {};
        }
        default: return {...state};
    }
};

export const logout = () => (dispatch: AppDispatch) => {
    const name = getStoredToken()?.name;
    if (name) {
        dispatch({
            type: 'login/logout',
            payload: {}
        });
    }
};

export const saveTokenToState = () => (dispatch: AppDispatch) => {
    const user = getStoredToken();
    if (user) {
        dispatch({
            type: 'login/init',
            payload: user
        });
    }
};

export const login = (loginInfo: unknown) => async (dispatch: AppDispatch) => {
    const credentials = parseCredentials(loginInfo);
    const token = await loginService.login(credentials);

    if (!isTokenData(token)) {
        throw new Error(`Invalid username or password`);
    }
    dispatch({
        type: 'login/storeToken',
        payload: token
    });
    return token;
};

export const getStoredToken = (): TokenData | null => {
    const localStorage = window.localStorage;
    const userString = localStorage.getItem('tokenData');

    if (!userString) return null; //To check against empty localStorage value

    const userLogin: unknown = JSON.parse(userString);

    return parseTokenData(userLogin);
};

export default reducer;