import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { removeNote } from '../../state/reducers/notes';

interface ViewProps {
    deleteNote: (e: React.FormEvent) => void;
    toggleHighlight: () => void;
}
const DeleteButtonView = ({ deleteNote, toggleHighlight }: ViewProps) => {
    const buttonStyle = {
        "color": "black",
        "borderRadius": "full",
        "bgColor": "transparent",
        "size": "sm",
        "_hover": {
            "color": "white",
            "bgColor": "red.900"
        },
        "title": "delete",
        "display": "flex",
        "justify-content": "center",
        "align-items": "center"
    };

    return (
        <IconButton
            {...buttonStyle}
            aria-label='delete'
            icon={<DeleteIcon/>}
            onClick={deleteNote}
            onMouseOver={toggleHighlight}
            onMouseOut={toggleHighlight}
            >delete
        </IconButton>
    );
};

const DeleteButton = ({ noteId }: { noteId: string }) => {
    const dispatch = useDispatch();

    const deleteNote = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(removeNote(noteId));
    };

    const toggleHighlight = () => {
        const noteContent = document.getElementById(noteId);
        if (noteContent) {
            switch(noteContent.style.color) {
                case 'red': {
                    noteContent.style.color = '';
                    // noteContent.style.textDecoration = '';
                    // noteContent.style.fontStyle = '';
                    break;
                }
                case '': {
                    noteContent.style.color = 'red';
                    // noteContent.style.textDecoration = 'line-through';
                    // noteContent.style.fontStyle = 'italic';
                    break;
                }
                default: break;
            }
        }
    };

    return (
        <DeleteButtonView 
            deleteNote={deleteNote} 
            toggleHighlight={toggleHighlight}/>
    );
};

export default DeleteButton;