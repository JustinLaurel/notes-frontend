import { Note } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNote = (value: any): value is Note => {
    if (!value.content || !isString(value.content)) {
        return false;
    } else if (!value.date || !isString(value.date) || !isDate(value.date)) {
        return false;
    }
    return true;
};

export const isNotesArray = (value: unknown[]): value is Note[] => {
    return value.every(isNote);
};

const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};