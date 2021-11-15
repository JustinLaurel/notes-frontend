import { ActionPayload, SignupData } from "../../types";
import { AppDispatch, AppGetState } from "../store";
import signupService from "../../services/signupService";
import { parseSignupData } from "../../validators/userValidators";
import { isStringAndExists } from "../../validators/parsers";

const reducer = (state = ([] as string[]), { type, payload }: ActionPayload) => {
    switch(type) {
        case 'signup/username/save': {
            if (isStringAndExists(payload)) {
                return [
                    ...state,
                    payload
                ];
            } else return [...state];
        }
        default: return [...state];
    }
};

export const signup = (signupInfo: SignupData) => async (dispatch: AppDispatch) => {
    const parsed = parseSignupData(signupInfo);
    const token = await signupService.signup(parsed);

    dispatch({
        type: 'login/storeToken',
        payload: token
    });

    dispatch({
        type: 'login/init',
        payload: token
    });
    return token;
};

export const saveUsername = (username: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: 'signup/username/save',
        payload: username.toLowerCase()
    });
};

const checkDatabaseForAvailability = async (username: string) => {
    const isAvailable = await signupService.checkUsernameAvailable(username);
    return isAvailable;
};

export const checkAvailability = (username: string) => async (dispatch: AppDispatch, getState: AppGetState) => {
    const lowercase = username.toLowerCase();
    const availableUsernames = getState().signup;
    
    if (availableUsernames && availableUsernames.includes(lowercase)) {
        return true;
    } 
    else {
        const isAvailable = await checkDatabaseForAvailability(lowercase);
        if (isAvailable) {
            dispatch({
                type: 'signup/username/save',
                payload: username
            });
            return true;
        } 
        else return false;
    }
};

export default reducer;