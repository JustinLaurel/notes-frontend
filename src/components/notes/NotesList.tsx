import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'; 

import { Note } from '../../types';
import { baseMargins } from '../../utils/styles';
import { Grid, Center, Box, Input, FormControl, Button } from '@chakra-ui/react';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import DeleteButton from './DeleteButton';
import { editNote, sortNote } from '../../state/reducers/notes';
import EditButton from './EditButton';
import SkeletonList from './SkeletonList';
import { stopEditMode } from '../../state/reducers/noteActionViews';
import { getStoredToken } from '../../state/reducers/login';

const NoteRowSortable = ({ note }: { note: Note }) => {
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
    
    const inputStyle = {
        height: "32px",
        padding: "0px",
        verticalAlign: "top",
    };

    const actionTracker = useSelector((state: RootState) => state.noteActionViews);
    const dispatch = useDispatch();
    const isBeingEdited = actionTracker.isEditing && actionTracker.noteId === note._id;

    const [edited, setEdited] = useState(note.content);

    //When note is sorted, the note parameter supplied changes, but edited maintains its 
    // original note.content's value before sorting 
    //This useEffect updates edited's value every time the note is sorted
    useEffect(() => setEdited(note.content), [note.content]);

    const saveNote = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(stopEditMode());
        if (edited === note.content) return;

        const toSave: Note = {...note, content: edited};
        dispatch(editNote(toSave));
    };
    const input = (
        <FormControl as="form" onSubmit={saveNote}>
            <Input id={note._id}
                style={inputStyle}
                autoFocus
                autoComplete="off"
                value={edited}
                onChange={(e) => setEdited(e.currentTarget.value)}
                onBlur={saveNote}
                >
            </Input>
            <Button style={{display: "none"}} />
        </FormControl>
    );

    const content = (
        <Box id={note._id}
            ref={setNodeRef} 
            {...attributes} 
            {...listeners} 
            style={sortableStyle}>
                {note.content}
        </Box>
    );

    const contentNode = isBeingEdited
        ? input
        : content;

    return (
        <React.Fragment key={note._id}>
            {contentNode}
            <Center>
                <EditButton note={note} isEditing={isBeingEdited} />
            </Center>
            <Center>
                <DeleteButton note={note} />
            </Center>
        </React.Fragment>
    );
};


const NotesList = () => {
    const notes: Note[] = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const gridStyle = {
        "templateColumns": "minmax(auto, 600px) 30px 30px",
        "autoRows": "min-max(32px, max-content)",
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

    const theList = notes.length > 0 || getStoredToken()
        ? notes.map(note => <NoteRowSortable note={note} key={note.position} />)
        : <SkeletonList rows={5} />;

    return (
        <Grid {...gridStyle} {...baseMargins} {...noteStyle}>
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