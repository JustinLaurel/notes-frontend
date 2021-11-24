import { Note, NewNote, PositionPayload, NoteIdPosition, UpdatePayload } from '../types';
import parser from './parsers';

export const isNewNote = (value: unknown): value is NewNote => {
    if (!value) return false;
    else if (!parser.isStringAndExists((value as NewNote).content)) return false;
    else if (!parser.isStringAndExists((value as NewNote).created) 
        || !isDate((value as NewNote).created)) return false;
    else if (!parser.isStringAndExists((value as NewNote).position)) return false;
    return true;
};

export const isNote = (value: unknown): value is Note => {
    if (!value) return false;
    if (!parser.isStringAndExists((value as Note)._id)) return false;
    else if (!isNewNote(value)) return false;
    return true;
};

export const isUpdatePayload = (value: unknown): value is UpdatePayload => {
    if (!value) return false;
    if (!parser.isStringAndExists((value as UpdatePayload).match)) return false;
    return isNote((value as UpdatePayload).note);
};

export const isNoteAndExists = (value: unknown): boolean => {
    if (!value) return false;
    else if (!isNote(value)) return false;

    return true;
};

export const isNotesArray = (value: unknown): value is Note[] => {
    return Array.isArray(value) && value.every(isNote);
};

export const createTempNoteId = () => {
    return JSON.stringify(Math.round(Math.random() * 100000000));
};

export const isPositionPayload = (value: unknown): value is PositionPayload => {
    if (value) {
        const payload = (value as PositionPayload);

        if ('activeIndex' in payload && typeof payload.activeIndex === 'number'
        && 'overIndex' in payload && typeof payload.overIndex === 'number') return true;
    }
    return false;
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};

export const parseNotePositions = (notes: Note[]): NoteIdPosition[] => {
    const parsed = [] as NoteIdPosition[];

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const notePositionWithId = {
            _id: note._id,
            position: note.position,
        };
        parsed.push(notePositionWithId);
    }
    return parsed;
};