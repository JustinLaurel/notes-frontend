import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../state/reducers/notes';
import { useField } from '../utils/hooks';

import { Input, Button, FormControl } from "@chakra-ui/react";
import { UseField } from '../../types';

const NoteFormView = 
    ({ onSubmit, noteInput }: { onSubmit: (e: React.FormEvent) => void, noteInput: UseField }) => {
    const inputStyle = {
        "placeholder": "new note...",
        "size": "sm",
        "w": 300,
        "variant": "filled",
        "borderRadius": "2xl",
        "m": 1.5,
        "ml": 4,
        "colorScheme": "facebook",
        "autoComplete": "off",
    };

    const buttonStyle = {
        "size": "xs",
        "bgColor": "black",
        "color": "white",
        "colorScheme": "twitter",
        "_hover": {
            "bgColor": "gray.600"
        },
        "title": "save new note"
    };

    return (
        <form onSubmit={onSubmit}>
            <FormControl>
                <Input {...inputStyle} {...noteInput}></Input>
                <Button {...buttonStyle}>save</Button>
            </FormControl>
        </form>
    );
};

const NoteForm = () => {
    const noteInput = useField('text');
    const dispatch = useDispatch();
    const addNote = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createNote(noteInput.value));
        noteInput.clearField();
    };

    return <NoteFormView onSubmit={addNote} noteInput={noteInput} />;
};

export default NoteForm;