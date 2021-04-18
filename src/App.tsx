import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { initializeNotes } from './components/state/reducers/notesReducer';
import { initializeTokenToState } from './components/state/reducers/loginReducer';

import NavBar from './components/NavBar';
import Home from './components/Home';
import NotesList from './components/notes/NotesList';
import NoteForm from './components/notes/NoteForm';
import LoginForm from './components/login/LoginForm';
import LoginBar from './components/login/LoginBar'; 

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(initializeNotes());
        dispatch(initializeTokenToState());
    }, [dispatch]);

    return (
        <Router>
            <NavBar />
            <LoginBar /> 
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
        </Router>
    );
}

export default App;