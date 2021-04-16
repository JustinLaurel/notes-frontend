
export const parseString = (value: unknown): string => {
    if (!value || !isString(value)) throw new Error(`Invalid or missing string`);
    return value;
};

export const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
};

export const isStringAndExists = (value: unknown): boolean => { //Tested, works properly
    if (!value && !(typeof value === 'string')) return false;
    else if (!isString(value)) return false;
    return true;
};

export default {
    isString,
    isStringAndExists
};