import React from 'react';
import { useSelector } from 'react-redux';
import { Note } from '../../types';
import { baseMargins } from '../../utils/styles';
import { RootState } from '../../state/store';
import { Grid, Center, Box } from '@chakra-ui/react';

import DeleteButton from './DeleteButton';

const NoteContentView = ({ content, _id }: { content: string, _id: string }) => {
    return (
        <Box id={_id}>
            {content}
        </Box>
    );
};

const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);

    const gridStyle = {
        "templateColumns": "minmax(auto, 600px) 30px",
        "rowGap": "5px"
    };

    const noteStyle = {
        'fontFamily': '"Lato",  sans serif',
        'fontSize': '16px'
    };

    return (
        <Grid {...gridStyle} {...baseMargins} {...noteStyle}>
            {notes.map(note => {
                return (
                    <React.Fragment key={note._id} >
                        <NoteContentView content={note.content} _id={note._id}/>
                        <Center>
                            <DeleteButton 
                                noteId={note._id} />
                        </Center>
                    </React.Fragment>
                );
            })}
        </Grid>
    );
};

export default NotesList;