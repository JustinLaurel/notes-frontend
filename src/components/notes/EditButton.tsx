import { IconButton, chakra } from '@chakra-ui/react';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setEditMode } from '../../state/reducers/noteActionViews';
import { Note } from '../../types';

const CAiFillEdit = chakra(AiFillEdit);

interface ViewProps {
    handleEdit: (e: React.FormEvent) => void,
    isEditing: boolean,
}
const EditButtonView = ({ handleEdit, isEditing }: ViewProps) => {
    const buttonStyle = {
        "bgColor": isEditing ? "gray.400" : "transparent",
        "borderRadius": "full",
        "size": "sm",
        "_hover": {
            "bgColor": "gray.400"
        },
        "title": "edit",
        
    };

    return (
        <IconButton 
            {...buttonStyle}
            aria-label='edit note' 
            icon={<CAiFillEdit />} 
            onClick={handleEdit} />
    );
};

interface ButtonProps {
    note: Note,
    isEditing: boolean,
}
const EditButton = ({ note, isEditing }: ButtonProps) => {
    const dispatch = useDispatch();

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setEditMode(note._id));
    };

    return (
        <EditButtonView 
            isEditing={isEditing}
            handleEdit={handleEdit} />
    );
};

export default EditButton;