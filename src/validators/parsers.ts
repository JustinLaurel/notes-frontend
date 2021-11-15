
export const parseString = (value: unknown, errorMsg?: string): string => {
    if (!value || !isString(value)) {
        if (errorMsg) throw new Error(errorMsg);
        else throw new Error(`Invalid or missing string: ${JSON.stringify(value)}`);
    }
    return value;
};

export const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String;
};

export const isStringAndExists = (value: unknown): value is string => { //Tested, works properly
    if (!value && !(typeof value === 'string')) return false;
    else if (!isString(value)) return false;
    return true;
};

export default {
    isString,
    isStringAndExists
};