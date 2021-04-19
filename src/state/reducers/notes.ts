import notesService from "../../services/notesService";
import { Note, NewNote } from "../../types";
import { isNoteAndExists, isNotesArray } from "../../validators/noteValidators";
import parser from '../../validators/parsers';
import { AppDispatch } from "../store";
import { ActionPayload } from '../../types';

const reducer = 
    (state = [], { type, payload }: ActionPayload) => {
    switch(type) {
        case 'notes/initialize': {
            if (Array.isArray(payload) && isNotesArray(payload)) {
                return [...payload];
            } else {
                console.log(`Invalid notes data: ${JSON.stringify(payload)}`);
                return [...state];
            }
        }
        case 'notes/remove': {
            if (parser.isStringAndExists(payload)) {
                const id = payload;
                const newState: Note[] = state.filter((note: Note) => note._id !== id);
                return newState;
            } else {
                console.error(`Failed deletion of note state`);
                return [...state];
            }
        }
        case 'notes/create': {
            if (isNoteAndExists(payload)) {
                return [
                    ...state,
                    payload
                ];
            } else {
                console.error(`Failed adding created note to state`);
                return [...state];
            }
        }
        default: 
            return [...state];
    }
};

export const initializeNotes = () => async (dispatch: AppDispatch) => {
    try {
        const notes = await notesService.getAll();
        dispatch({
            type: 'notes/initialize',
            payload: notes
        });
    } catch(e) {
        console.log(`Error initializing notes: ${e.message}`);
    }
};

export const removeNote = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await notesService.remove(id);
        dispatch({
            type: 'notes/remove',
            payload: id
        });
    } catch(e) {
        console.log(`Error deleting note: ${e.message}`);
    }
};

export const createNote = (content: string) => async (dispatch: AppDispatch) => { 
    const note: NewNote = {
        content,
        created: new Date().toString()
    };
    try {
        const newNote = await notesService.addNew(note);
        dispatch({
            type: 'notes/create',
            payload: newNote
        });        
    } catch(e) {
        console.log(`Error adding new notes: ${e.message}`);
    }
};

export default reducer;