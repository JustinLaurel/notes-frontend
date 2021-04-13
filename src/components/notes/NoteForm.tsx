import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../state/reducers/notesReducer';
import { useField } from '../utils/hooks';
import { baseComponentStyle } from '../utils/styles';

const NoteForm = () => {
    const noteInput = useField('text');
    const dispatch = useDispatch();
    const addNote = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createNote(noteInput.value));
        noteInput.clearField();
    };

    return (
        <>
            <input {...noteInput} style={baseComponentStyle}></input>
            <button onClick={addNote}>save</button>
        </>
    );
};

export default NoteForm;