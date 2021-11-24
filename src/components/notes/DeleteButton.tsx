import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { removeNote } from '../../state/reducers/notes';
import { Note } from '../../types';

interface ViewProps {
    handleDelete: (e: React.FormEvent) => void;
    toggleHighlight: () => void;
}
const DeleteButtonView = ({ handleDelete, toggleHighlight }: ViewProps) => {
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
    };

    return (
        <IconButton
            {...buttonStyle}
            aria-label='delete'
            icon={<DeleteIcon/>}
            onClick={handleDelete}
            onMouseOver={toggleHighlight}
            onMouseOut={toggleHighlight}
            >delete
        </IconButton>
    );
};

const DeleteButton = ({ note }: { note: Note }) => {
    const dispatch = useDispatch();

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(removeNote(note));
    };

    const toggleHighlight = () => {
        const noteContent = document.getElementById(note._id);
        if (noteContent) {
            switch(noteContent.style.color) {
                case 'red': {
                    noteContent.style.color = '';
                    break;
                }
                case '': {
                    noteContent.style.color = 'red';
                    break;
                }
                default: break;
            }
        }
    };

    return (
        <DeleteButtonView 
            handleDelete={handleDelete} 
            toggleHighlight={toggleHighlight}/>
    );
};

export default DeleteButton;