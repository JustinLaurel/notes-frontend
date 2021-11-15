import { createStore, combineReducers, applyMiddleware } from 'redux';
import notesReducer from './reducers/notes';
import loginReducer from './reducers/login';
import viewsReducer from './reducers/views';
import signupReducer from './reducers/signup';

import thunk from 'redux-thunk';

const root = combineReducers({
    notes: notesReducer,
    login: loginReducer,
    views: viewsReducer,
    signup: signupReducer,
});

const store = createStore(
    root,
    applyMiddleware(thunk)
);

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

//To use as type for useSelector's state parameter
export type RootState = ReturnType<typeof store.getState>;