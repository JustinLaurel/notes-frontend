import { TokenData, ActionPayload } from "../../../types";
import { parseCredentials, parseTokenData, isTokenData } from "../../../validators/loginValidators";
import { AppDispatch } from "../store";
import loginService from '../../../services/loginService';
// import { setNotification } from './notificationsReducer';
// import { useDispatch } from 'react-redux';

const reducer = (state = {}, { type, payload }: ActionPayload) => {
    const localStorage = window.localStorage;
    // const dispatch = useDispatch();

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
                // dispatch(setNotification(`Login failed unexpectedly. Please try again`));
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
    dispatch({
        type: 'login/logout',
        payload: {}
    });
};

export const initializeTokenToState = () => (dispatch: AppDispatch) => {
    const user = getStoredToken();
    if (user) {
        dispatch({
            type: 'login/init',
            payload: user
        });
    }
};

export const login = (loginInfo: unknown) => async (dispatch: AppDispatch) => {
    try {
        const credentials = parseCredentials(loginInfo);
        const token = await loginService.login(credentials);
        console.log(`token=${JSON.stringify(token)}`);
        dispatch({
            type: 'login/storeToken',
            payload: token
        });
        // dispatch(setNotification(`Login successful!`));
    } catch(e) {
        // dispatch(setNotification(e.message)); //NEED NOTIFICATION REDUCER
    }
};

export const getStoredToken = (): TokenData | null => {
    const localStorage = window.localStorage;
    const userString = localStorage.getItem('tokenData');

    if (!userString) return null; //To check against empty localStorage value

    const userLogin: unknown = JSON.parse(userString);

    return parseTokenData(userLogin);
};

export default reducer;