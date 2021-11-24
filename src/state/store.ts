import { createStore, combineReducers, applyMiddleware } from 'redux';
import notesReducer from './reducers/notes';
import loginReducer from './reducers/login';
import signupReducer from './reducers/signup';
import userFormViews from './reducers/userFormViews';
import noteActionViews from './reducers/noteActionViews';

import thunk from 'redux-thunk';

const root = combineReducers({
    notes: notesReducer,
    login: loginReducer,
    signup: signupReducer,
    userFormViews: userFormViews,
    noteActionViews: noteActionViews,
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