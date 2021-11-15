import { AppDispatch } from "../store";

const baseLoginType = 'views/loginForm';
const baseSignupType = 'views/signupForm';

const reducer = (state = 
    {loginForm: false, 
        loginSpinner: false,
        signupForm: false,
        signupSpinner: false}, 
    { type }: { type: string }) => {
    switch(type) {
        case `${baseLoginType}/toggle`: {
            return {...state, signupForm: false, loginForm: !state.loginForm};
        }
        case `${baseLoginType}/show`: {
            return {...state, signupForm: false, loginForm: true};
        }
        case `${baseLoginType}/hide`: {
            return {...state, loginForm: false};
        }
        case `${baseLoginType}/spinner/show`: {
            return {...state, loginSpinner: true};
        }
        case `${baseLoginType}/spinner/hide`: {
            return {...state, loginSpinner: false};
        }
        case `${baseSignupType}/toggle`: {
            return {...state, loginForm: false, signupForm: !state.signupForm};
        }
        case `${baseSignupType}/show`: {
            return {...state, loginForm: false, signupForm: true};
        }
        case `${baseSignupType}/hide`: {
            return {...state, signupForm: false};
        }
        case `${baseSignupType}/spinner/show`: {
            return {...state, signupSpinner: true};
        }
        case `${baseSignupType}/spinner/hide`: {
            return {...state, signupSpinner: false};
        }
        default: return {...state};
    }
};


export const toggleLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseLoginType}/toggle`
    });
};

export const showLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseLoginType}/show`
    });
};

export const hideLoginForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseLoginType}/hide`
    });
};

export const showLoginSpinner = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseLoginType}/spinner/show`
    });
};

export const hideLoginSpinner = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseLoginType}/spinner/hide`
    });
};

export const toggleSignupForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseSignupType}/toggle`
    });
};

export const showSignupForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseSignupType}/show`
    });
};

export const hideSignupForm = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseSignupType}/hide`
    });
};

export const showSignupSpinner = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseSignupType}/spinner/show`
    });
};

export const hideSignupSpinner = () => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseSignupType}/spinner/hide`
    });
};

export default reducer;