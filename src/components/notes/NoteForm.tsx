import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../state/reducers/notes';
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
        <form onSubmit={addNote}>
            <input {...noteInput} style={baseComponentStyle}></input>
            <button>save</button>
        </form>
    );
};

export default NoteForm;