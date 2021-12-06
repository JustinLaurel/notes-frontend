import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, ChakraProvider, useToast } from '@chakra-ui/react';
import { noteToasts } from './utils/toasts/notes';

import { initializeNotes } from './state/reducers/notes';
import { saveTokenToState } from './state/reducers/login';

import NavBar from './components/NavBar';
import Home from './components/Home';
import NotesList from './components/notes/NotesList';
import NoteForm from './components/notes/NoteForm';
import Pad from './components/pad/Pad';
import LoginForm from './components/login/LoginForm';
import UserBar from './components/UserBar';
import SignupForm from './components/signup/SignupForm';

function App() {
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        try {
            dispatch(initializeNotes());
            dispatch(saveTokenToState());
        } catch(e) {
            console.error(`Network error during notes initialization`);
            toast(noteToasts.failedGet);
        }
    }, [dispatch]);

    return (
        <ChakraProvider>
            <Router>
                <Box>
                    <NavBar />
                    <UserBar />
                    <Switch>
                        <Route path='/notes'>
                            <NotesList />
                            <NoteForm />
                        </Route>
                        <Route path='/pad'>
                            <Pad />
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch> <br />
                    <LoginForm />
                    <SignupForm />
                </Box>
            </Router>
        </ChakraProvider>
    );
}

export default App;