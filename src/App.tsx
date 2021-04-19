import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { initializeNotes } from './state/reducers/notes';
import { saveTokenToState } from './state/reducers/login';

import NavBar from './components/NavBar';
import Home from './components/Home';
import NotesList from './components/notes/NotesList';
import NoteForm from './components/notes/NoteForm';
import LoginForm from './components/login/LoginForm';
import UserBar from './components/login/UserBar';
import Notification from './components/Notification';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeNotes());
        dispatch(saveTokenToState());
    }, [dispatch]);

    return (
        <Router>
            <NavBar />
            <UserBar /> 
            <Switch>
                <Route path='/notes'>
                    <NotesList />
                    <NoteForm />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch> <br /> <br />
            <LoginForm />
            <Notification />
        </Router>
    );
}

export default App;