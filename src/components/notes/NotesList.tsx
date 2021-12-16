import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'; 
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Note } from '../../types';
import { Grid } from '@chakra-ui/react';

import { sortNote } from '../../state/reducers/notes';
import { getStoredToken } from '../../state/reducers/login';

import SkeletonList from './SkeletonList';
import NoteRowSortable from './NoteRowSortable';

const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const gridStyle = {
        "mt": "1",
        "templateColumns": "minmax(auto, 37.5rem) 1.875rem 1.875rem",
        "autoRows": "min-max(2rem, max-content)",
        "rowGap": "5px",
    };
    const noteStyle = {
        'fontFamily': '"Lato",  sans serif',
        'fontSize': '1rem'
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

    const theList = getStoredToken() && notes.length === 0
        ? <SkeletonList rows={5} />
        : notes.map(note => <NoteRowSortable note={note} key={note.position} />);

    return (
        <Grid {...gridStyle} {...noteStyle}>
            <DndContext 
            onDragEnd={handleDragEnd} 
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            collisionDetection={closestCenter}>
                <SortableContext 
                items={notes.map(note => note.position)} 
                strategy={verticalListSortingStrategy}>
                    {theList}
                </SortableContext>
            </DndContext>
        </Grid>
    );
};

export default NotesList;