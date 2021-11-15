import { Note, NewNote } from '../types';
import parser from './parsers';

export const isNewNote = (value: unknown): value is NewNote => {
    if (!value) return false;
    else if (!parser.isStringAndExists((value as NewNote).content)) return false;
    else if (!parser.isStringAndExists((value as NewNote).created) 
        || !isDate((value as NewNote).created)) return false;
    return true;
};

export const isNote = (value: unknown): value is Note => {
    if (!value) return false;
    if (!parser.isStringAndExists((value as Note)._id)) return false;
    else if (!isNewNote(value)) return false;
    return true;
};

export const isNoteAndExists = (value: unknown): boolean => {
    if (!value) return false;
    else if (!isNote(value)) return false;

    return true;
};

export const isNotesArray = (value: unknown): value is Note[] => {
    return Array.isArray(value) && value.every(isNote);
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};