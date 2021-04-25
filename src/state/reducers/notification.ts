import { useTimeout } from "../../utils/hooks";
import { AppDispatch } from "../store";

interface NotificationPayload {
    type: string,
    payload: {
        message: string,
    }
}

const reducer = (state = '', { type, payload }: NotificationPayload) => {
    switch(type) {
        case 'notification/toast/set': {
            return payload.message;
        }
        case 'notification/toast/clear': {
            return '';
        }
        default: return state + '';
    }
};

export const setNotification = (message: string, notifyFor = 4000) => (dispatch: AppDispatch) => {
    const timeout = useTimeout();

    //If setTimedNotification gets called a second time before the first call's setTimeout's 
    // function executes, the second notification will be prematurely cleared by the first
    // call
    timeout.clear(); //This line solves the aforementioned problem

    dispatch({
        type: 'notification/toast/set',
        payload: {
            message
        }
    });

    timeout.set(() => dispatch({
        type: 'notification/toast/clear'
    }), notifyFor);    
};

export const clearNotification = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'notification/toast/clear',
    });
};

export default reducer;