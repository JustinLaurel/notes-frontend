import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Note } from '../../types';
import { baseComponentStyle } from '../utils/styles';
import { RootState } from '../state/store';
import { removeNote } from '../state/reducers/notesReducer';

const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const modifiedStyle = {
        ...baseComponentStyle,
        marginTop: '10px',
    };

    const deleteNote = (id: string) => (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(removeNote(id));
    };

    return (
        <div style={modifiedStyle}>
            {notes.map(note => {
                return (
                    <p key={note._id}>
                        {note.content}<button onClick={deleteNote(note._id)}>delete</button>
                    </p>
                );
            })}
        </div>
    );
};

export default NotesList;