import { Credentials, TokenData } from "../types";

export const parseTokenData = (value: unknown): TokenData => { //Fix this?
    if (!value || !isTokenData(value)) throw new Error(`Invalid or missing token`);
    return value;
};

export const parseCredentials = (value: unknown): Credentials => {
    if (isCredentials(value)) {
        return {
            username: value.username,
            password: value.password
        };
    } else {
        throw new Error(`Invalid username or password`);
    }
};

export const isTokenData = (value: unknown): value is TokenData => {
    if (value && typeof value === 'object') {
        return 'token' in value
            && 'username' in value
            && 'name' in value;
    }
    return false;
};

const isCredentials = (value: unknown): value is Credentials => {
    if (value && typeof value === 'object') {
        if ('username' in value && 'password' in value) return true;
    }
    return false;
};