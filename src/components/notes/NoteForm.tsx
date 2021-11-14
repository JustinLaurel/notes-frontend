import React, { forwardRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../state/reducers/notes';
import { useField } from '../../utils/hooks';

import { Input, Button, FormControl } from "@chakra-ui/react";
import { UseField } from '../../types';

type FormViewProps = {
    onSubmit(e: React.FormEvent): void,
    noteInput: UseField,
};
const NoteFormView = 
    forwardRef<HTMLInputElement, FormViewProps>(({ onSubmit, noteInput }, ref) => {
    const inputStyle = {
        "placeholder": "new note...",
        "size": "sm",
        "w": 350,
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
        <FormControl as="form" onSubmit={onSubmit}>
            <Input ref={ref} {...inputStyle} {...noteInput}></Input>
            <Button {...buttonStyle}>save</Button>
        </FormControl>
    );
});

const NoteForm = () => {
    const noteInput = useField('text');
    const dispatch = useDispatch();
    const addNote = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createNote(noteInput.value));
        noteInput.clearField();
    };

    const formInput = useRef<HTMLInputElement>(null);
    //Slash listener, if user presses '/' key on keyboard with no element currently in 
    // focus, then the note form input will be selected
    const addSlashListener = () => {
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Slash' && formInput.current && !document.activeElement?.id) {
                formInput.current.focus();
            }
        });
    };
    addSlashListener();

    return <NoteFormView ref={formInput} onSubmit={addNote} noteInput={noteInput} />;
};

export default NoteForm;