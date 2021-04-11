import React from 'react';
import { Note } from '../../types';

const NotesList = (notes: Array<Note>) => {
    return (
        <ul>
            {notes.map(note => {
                    return <li key={note.content}>{note.content}</li>;
                })}
        </ul>
    );
};

export default NotesList;