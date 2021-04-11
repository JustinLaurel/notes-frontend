import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Switch
} from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import NoteList from './components/pages/NotesList';

function App() {
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