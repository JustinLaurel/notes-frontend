import React, { useEffect, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Note } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { Box, Button, Center, FormControl, Textarea } from '@chakra-ui/react';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { stopEditMode } from '../../state/reducers/noteActionViews';
import autosize from 'autosize';
import { editNote } from '../../state/reducers/notes';

const EditTextarea = ({ note }: { note: Note }) => {
    const textareaStyle = {
        height: "32px",
        padding: "0px",
        verticalAlign: "top",
        overflow: 'hidden',
    };


    const dispatch = useDispatch();
    const [edited, setEdited] = useState(note.content);
    const textarea = useRef(null);

    //When note is sorted, the note parameter changes, but edited maintains its 
    // original note.content's value, before the sort 
    //This line updates the value of edited every time the note is sorted
    useEffect(() => {
        setEdited(note.content);
    }, [note.content]);


    const saveNote = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(stopEditMode());
        if (edited === note.content) return;

        const toSave: Note = {...note, content: edited};
        dispatch(editNote(toSave));
    };

    // const [keysPressed, setKeysPressed] = useState([] as string[]);
    // const handleKeyDown = (event: React.KeyboardEvent) => {
    //     setKeysPressed([...keysPressed, event.key]);
    // };
    // const handleKeyUp = (event: React.KeyboardEvent) => {

    //     if (keysPressed.some(key => key === 'Shift') && event.key === 'Enter') {
    //         console.log(`keysPressed called`);
    //     }

    //     setKeysPressed(keysPressed.filter(key => key !== event.key));
    // };

    return (
        <FormControl as="form" onSubmit={saveNote}>
            <Textarea 
                ref={textarea}
                as="textarea"
                id={note._id}
                style={textareaStyle}
                autoFocus
                autoComplete="off"
                value={edited}
                rows={1}
                spellCheck={false}
                onChange={(e) => setEdited(e.currentTarget.value)}
                onBlur={saveNote}
                >
            </Textarea>
            <Button style={{display: "none"}} />
        </FormControl>
    );
};

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
    
    //Subscribes to when EditButton is pressed
    const actionTracker = useSelector((state: RootState) => state.noteActionViews);
    const isBeingEdited = actionTracker.isEditing && actionTracker.noteId === note._id;
    
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
        ? <EditTextarea note={note} />
        : content;

    useEffect(() => {
        if (isBeingEdited) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            autosize(document.querySelector('textarea')!);
        }
    }, [isBeingEdited]);

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

export default NoteRowSortable;