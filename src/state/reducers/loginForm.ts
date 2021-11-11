import { AppDispatch } from "../store";

const reducer = (state = {form: false, spinner: false}, { type }: { type: string }) => {
    switch(type) {
        case 'loginForm/toggle': {
            return {...state, form: !state.form};
        }
        case 'loginForm/show': {
            return {...state, form: true};
        }
        case 'loginForm/hide': {
            return {...state, form: false};
        }
        case 'loginForm/spinner/show': {
            return {...state, spinner: true};
        }
        case 'loginForm/spinner/hide': {
            return {...state, spinner: false};
        }
        default: return {...state};
    }
};

export const toggleLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginForm/toggle'
    });
};

export const showLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginForm/show'
    });
};

export const hideLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginForm/hide'
    });
};

export const showLoginSpinner = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginForm/spinner/show'
    });
};

export const hideLoginSpinner = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginForm/spinner/hide'
    });
};

export default reducer;