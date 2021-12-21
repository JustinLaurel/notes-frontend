import React, { forwardRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../state/reducers/notes';
import { useField } from '../../utils/hooks';

import { Input, Button, FormControl, useToast } from "@chakra-ui/react";
import { noteToasts as toasts } from '../../utils/toasts/notes';
import { UseField } from '../../types';
import { userIsLoggedIn } from '../../state/reducers/login';

import { MIN_NOTE_LENGTH } from '../../constants';

type FormViewProps = {
    onSubmit(e: React.FormEvent): void,
    noteInput: UseField,
};
const NoteFormView = 
    forwardRef<HTMLInputElement, FormViewProps>(({ onSubmit, noteInput }, ref) => {
    const styles = (() => {
        const input = {
            "placeholder": "new note...",
            "size": "sm",
            "w": "min(95%, 27.5rem)",
            "variant": "filled",
            "borderRadius": "2xl",
            "m": 1.5,
            "ml": -0.5,
            "colorScheme": "facebook",
            "autoComplete": "off",
        };

        const button = {
            "size": "xs",
            "bgColor": "black",
            "color": "white",
            "colorScheme": "twitter",
            "_hover": {
                "bgColor": "gray.600"
            },
            "title": "save new note",
            "type": "submit" as const,
        };

        return {input, button};
    })();

    return (
        <FormControl as="form" onSubmit={onSubmit}>
            <Input ref={ref} {...styles.input} {...noteInput}></Input>
            <Button {...styles.button}>save</Button>
        </FormControl>
    );
});

const NoteForm = () => {
    const noteInput = useField('text');
    const dispatch = useDispatch();
    const toast = useToast();

    const checkAndNotifyIfNoteIsInvalid = () => {
        if (noteInput.value.length < MIN_NOTE_LENGTH) {
            toast(toasts.noteTooShort());
            return false;
        } else if (!userIsLoggedIn()) {
            toast(toasts.notLoggedIn);
            return false;
        }

        return true;
    };

    const addNote = (e: React.FormEvent) => {
        e.preventDefault();

        const noteIsValid = checkAndNotifyIfNoteIsInvalid();
        if (!noteIsValid) return;

        try {
            dispatch(createNote(noteInput.value));
            noteInput.clearField();
        } catch(e) {
            console.error((e as Error).message);
            toast(toasts.failedCreate);
        }
    };

    const formInput = useRef<HTMLInputElement>(null);
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