import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'; 

import { Note } from '../../types';
import { baseMargins } from '../../utils/styles';
import { RootState } from '../../state/store';
import { Grid, Center, Box } from '@chakra-ui/react';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


import DeleteButton from './DeleteButton';
import { sortNote } from '../../state/reducers/notes';

const SortableNoteView = ({ note }: { note: Note }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transition, 
        transform,
    } = useSortable({ id: note.position });

    const sortableStyle = {
        transition,
        transform: transform 
            ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
            : undefined
    };

    return (
        <React.Fragment key={note._id} >
            <Box id={note._id} ref={setNodeRef} {...attributes} {...listeners} style={sortableStyle}>
                {note.content}
            </Box>
            <Center>
            <DeleteButton
                note={note} />
            </Center>
        </React.Fragment>
    );
};

const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const gridStyle = {
        "templateColumns": "minmax(auto, 600px) 30px",
        "rowGap": "5px",
    };
    const noteStyle = {
        'fontFamily': '"Lato",  sans serif',
        'fontSize': '16px'
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = ({ active, over }: { active: any, over: any}) => {
        if (!active || !over) return;
        const activeIndex = notes.findIndex(note => note.position === active.id);
        const overIndex = notes.findIndex(note => note.position === over.id);

        // if(note was actually moved)
        if(activeIndex !== overIndex) dispatch(sortNote(activeIndex, overIndex));
        else return;
    };

    return (
        <Grid {...gridStyle} {...baseMargins} {...noteStyle}>
            <DndContext 
            onDragEnd={handleDragEnd} 
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            collisionDetection={closestCenter}>
                <SortableContext 
                items={notes.map(note => note.position)} 
                strategy={verticalListSortingStrategy}>
                    {notes.map(note => <SortableNoteView note={note} key={note.position} />)}
                </SortableContext>
            </DndContext>
        </Grid>
    );
};

export default NotesList;