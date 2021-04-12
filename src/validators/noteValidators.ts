import { Note } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNote = (value: any): value is Note => {
    if (!value.content || !isString(value.content)) {
        return false;
    } else if (!value.created || !isString(value.created) || !isDate(value.created)) {
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
    console.log(`isDate=${Date.parse(value)}`);
    return Boolean(Date.parse(value));
};