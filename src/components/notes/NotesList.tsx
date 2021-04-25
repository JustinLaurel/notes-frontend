import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Note } from '../../types';
import { baseMargins } from '../utils/styles';
import { RootState } from '../../state/store';
import { removeNote } from '../../state/reducers/notes';
import { IconButton, Grid, Center } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteButtonView = ({ deleteNote }: { deleteNote: (e: React.FormEvent) => void }) => {
    const buttonStyle = {
        "color": "black",
        "borderRadius": "full",
        "bgColor": "red.500",
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
            >delete
        </IconButton>
    );
};

const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const deleteNote = (id: string) => (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(removeNote(id));
    };

    const gridStyle = {
        "templateColumns": "minmax(auto, 400px) 30px",
        "rowGap": "5px"
    };

    return (
        <Grid {...gridStyle} {...baseMargins}>
            {notes.map(note => {
                return (
                    <React.Fragment key={note._id}>
                        <p>
                            {note.content}
                        </p>
                        <Center>
                            <DeleteButtonView deleteNote={deleteNote(note._id)}/>
                        </Center>
                    </React.Fragment>
                );
            })}
        </Grid>
    );
};

export default NotesList;