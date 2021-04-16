import { Note, NewNote } from '../types';
import parser from './parsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNewNote = (value: any): value is NewNote => {
    if (!value) return false;
    else if (!parser.isStringAndExists(value.content)) return false;
    else if (!parser.isStringAndExists(value.created) || !isDate(value.created)) return false;
    return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNote = (value: any): value is Note => {
    if (!value) return false;
    if (!parser.isStringAndExists(value._id)) return false;
    else if (!isNewNote(value)) return false;
    return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNoteAndExists = (value: any): boolean => {
    if (!value) return false;
    else if (!isNote(value)) return false;

    return true;
};

export const isNotesArray = (value: unknown[]): value is Note[] => {
    return value.every(isNote);
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};