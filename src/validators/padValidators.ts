import { Pad } from "../types";

export const isPad = (value: unknown): value is Pad => {
    const test = value as Pad;
    return (
        '_id' in test && typeof test._id === 'string' &&
        'content' in test && typeof test.content === 'string' &&
        'user' in test && typeof test.user === 'string'
    );
};

export const parsePad = (value: unknown) => {
    if (!isPad(value)) throw new Error(`Value from backend is not a valid Pad object`);
    return value;
};