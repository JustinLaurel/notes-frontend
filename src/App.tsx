import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { initialize as initializeNotes } from './components/state/reducers/notesReducer';

import NavBar from './components/NavBar';
import Home from './components/Home';
import NotesList from './components/notes/NotesList';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeNotes());
    }, [dispatch]);

    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path='/notes'>
                    <NotesList />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;