import { AppDispatch } from "../store";

const reducer = (state = false, { type }: { type: string }) => {
    switch(type) {
        case 'loginFormVisibility/toggle': {
            return !state;
        }
        case 'loginFormVisibility/show': {
            return true;
        }
        case 'loginFormVisibility/hide': {
            return false;
        }
        default: return state;
    }
};

export const toggleLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginFormVisibility/toggle'
    });
};

export const showLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginFormVisibility/show'
    });
};

export const hideLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'loginFormVisibility/hide'
    });
};

export default reducer;