import { createStore, combineReducers, applyMiddleware } from 'redux';
import notesReducer from './reducers/notesReducer';
import loginReducer from './reducers/loginReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    notes: notesReducer,
    login: loginReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;

//No idea why we need this. Redux docs said to declare this so why not
export type AppDispatch = typeof store.dispatch;

//To use as type for useSelector's state parameter
export type RootState = ReturnType<typeof store.getState>;