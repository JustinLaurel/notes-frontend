import { createStore, combineReducers } from 'redux';
import notesReducer from './notesReducer';

const rootReducer = combineReducers({
    notes: notesReducer
});

const store = createStore(rootReducer);

export default store;

export type AppDispatch = typeof store.dispatch;