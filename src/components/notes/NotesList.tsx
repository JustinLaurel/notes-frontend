import React from 'react';
import { useSelector } from 'react-redux';
import { Note } from '../../types';
import { baseComponentStyle } from '../styles';
import { RootState } from '../state/store';

const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);

    const modifiedStyle = {
        ...baseComponentStyle,
        marginTop: '10px',
    };

    const deleteNote = (e: Event) => {
        e.preventDefault();
        
    };

    return (
        <div style={modifiedStyle}>
            {notes.map(note => {
                return <p key={note.content}>{note.content}</p>;
            })}
        </div>
    );
};

export default NotesList;