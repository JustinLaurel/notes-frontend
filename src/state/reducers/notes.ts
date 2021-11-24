import notesService, { UPDATE_CONTENT, UPDATE_POSITION } from "../../services/notesService";
import { Note, NewNote } from "../../types";
import { createTempNoteId, isNote, isNotesArray, isUpdatePayload, parseNotePositions } from "../../validators/noteValidators";
import parser from '../../validators/parsers';
import { AppDispatch, AppGetState } from "../store";
import { ActionPayload } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { decrementNumberString, incrementNumberString, isBetween } from "../../utils/computations";

const FIRST_NOTE_ID = '0' as string;

const reducer = (state = [] as Note[], { type, payload }: ActionPayload) => {
    switch(type) {
        case 'notes/initialize': {
            if (isNotesArray(payload)) {
                return [...payload];
            } else {
                return [...state];
            }
        }
        case 'notes/remove': {
            if (parser.isStringAndExists(payload)) {
                const id = payload;
                const newState = filterOutNote(state, id);
                return newState;
            } else {
                console.error(`Failed deletion of note state`);
                return [...state];
            }
        }
        case 'notes/create': {
            if (isNote(payload)) {
                return [
                    ...state,
                    payload
                ];
            } else {
                console.error(`Failed adding created note to state`);
                return [...state];
            }
        }
        case 'notes/updateOne': {
            if (isUpdatePayload(payload)) {
                const notes = [...state];
                const index = notes.findIndex(note => note._id === payload.match);
                notes[index] = payload.note;
                return notes;
            } else {
                console.error(`Payload in notes/updateOne reducer is not an UpdatePayload`);
                return [...state];
            }
        }
        case 'notes/updateArray': {
            if (isNotesArray(payload)) {
                return [...payload];
            } else {
                console.error(`Failed to update notes in notes reducer`);
                return [...state];
            }
        }
        case 'notes/clear': {
            return [];
        }
        default: 
            return [...state];
    }
};

const filterOutNote = (notes: Note[], idToFilter: string) => {
    return notes.filter((note: Note) => note._id !== idToFilter);
};


export const editNote = (edited: Note) => async (dispatch: AppDispatch) => {
    dispatch({
        type: 'notes/updateOne',
        payload: {
            match: edited._id,
            note: edited
        }
    });

    try {
        const updated = await notesService.update(edited, UPDATE_CONTENT);
        return updated;
    } catch(e) {
        console.error(`Error deleting note: ${(e as Error).message}`);
    }
};


//updates note.position values of the moved notes
//note.position is used to track the position of the notes for the MongoDB database
//arrayMove from dnd-kit only moves the notes in the store, with no way to track the 
// changes in position
const updatePositionsSorted = (moved: Note[], activeIndex: number, overIndex: number) => {
    const changedNotes = [] as Note[];
    if (overIndex > activeIndex) { //dragged vertically downwards
        // for loops are much faster than callback function-based loops
        for (let i = 0; i < moved.length; i++) {
            const note = moved[i];
            //Because the note was dragged downwards, all notes that the dragged note passed 
            // through will have its position in the notes array reduced by 1
            if (isBetween(Number(note.position), activeIndex + 1, overIndex)) {
                note.position = decrementNumberString(note.position);
                changedNotes.push(note);
            }
        }
    } else if (overIndex < activeIndex) { //dragged vertically upwards
        for (let i = 0; i < moved.length; i++) {
            const note = moved[i];
            if (isBetween(Number(note.position), overIndex, activeIndex - 1)) {
                note.position = incrementNumberString(note.position);
                changedNotes.push(note);
            }
        }
    }

    //Finally updates the position value of the moved note itself
    moved[overIndex].position = JSON.stringify(overIndex);
    changedNotes.push(moved[overIndex]); 

    return {
        updated: moved,
        changedNotes
    };
};
const moveArray = <Type>(toMove: Type[], activeIndex: number, overIndex: number) => {
    return [...arrayMove(toMove, activeIndex, overIndex)];
};
const updatePositionsSortedInDb = async (notes: Note[]) => {
    const positions = parseNotePositions(notes);
    const updated = await notesService.update(positions, UPDATE_POSITION);
    return updated;
};
export const sortNote = (activeIndex: number, overIndex: number) => 
async (dispatch: AppDispatch, getState: AppGetState) => {
    const original = getState().notes;
    const moved = moveArray<Note>(original, activeIndex, overIndex);

    //updatedNotes=array of only notes that had position fields changed
    const { updated, changedNotes } = updatePositionsSorted(moved, activeIndex, overIndex);

    dispatch({
        type: 'notes/updateArray',
        payload: updated
    });

    await updatePositionsSortedInDb(changedNotes);
};


const updatePositionsDeleted = (notes: Note[], deletedPosition: string) => {
    const changedNotes = [] as Note[];
    for(let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (Number(note.position) > Number(deletedPosition)) {
            note.position = JSON.stringify(Number(note.position) - 1);
            changedNotes.push(note);
        }
    }

    return {
        updated: notes,
        changedNotes
    };
};
export const removeNote = (note: Note) => async (dispatch: AppDispatch, getState: AppGetState) => {
    try {
        const notes = [...getState().notes];
        const deletedPosition = note.position;

        const { updated, changedNotes } = updatePositionsDeleted(notes, deletedPosition);
        const positions = parseNotePositions(changedNotes);

        dispatch({
            type: 'notes/updateArray',
            payload: updated
        });

        dispatch({
            type: 'notes/remove',
            payload: note._id
        });

        await notesService.remove(note._id, positions);
    } catch(e) {
        console.error(`Error deleting note: ${(e as Error).message}`);
    }
};


export const clearNotes = () => (dispatch: AppDispatch) => {
    dispatch({
        type: 'notes/clear',
    });
};

export const initializeNotes = () => async (dispatch: AppDispatch) => {
    const notes = await notesService.getAll();
    dispatch({
        type: 'notes/initialize',
        payload: notes
    });
};

export const createNote = (content: string) => 
async (dispatch: AppDispatch, getState: AppGetState) => {
    const lastNote = getState().notes.at(-1);

    const newNote: NewNote = {
        content,
        created: new Date().toString(),
        position: lastNote 
            ? JSON.stringify(Number(lastNote.position) + 1)
            : FIRST_NOTE_ID
    };

    const temp_id = createTempNoteId();

    try {
        //Note-creation is implemented in such a way that note-adding is instantaneous, instead
        // of waiting for a response from the backend
        dispatch({
            type: 'notes/create',
            payload: {
                ...newNote,
                _id: temp_id
            }
        });

        const noteWithId = await notesService.addNew(newNote); 
        dispatch({
            type: 'notes/remove',
            payload: temp_id
        });
        dispatch({
            type: 'notes/create',
            payload: noteWithId
        });
    } catch(e) {
        console.error(`Error adding note: ${(e as Error).message}`);
    }
};

export default reducer;