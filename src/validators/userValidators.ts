import { ParsedSignupData, SignupData } from "../types";
import { isString } from "./parsers";

import {
    MIN_PASSWORD_LENGTH,
    MIN_NAME_LENGTH,
    MIN_USERNAME_LENGTH,

    USERNAME_ERROR as usernameErr,
    NAME_ERROR as nameErr,
    PASSWORD_ERROR as passwordErr,
    VERIFY_ERROR as verifyErr,
} from '../constants';

export const isValidPassword = (pass: string) => {
    return hasAtLeastOneLetter(pass)
        && hasAtLeastOneNumber(pass) 
        && hasAtLeastXCharacters(pass, MIN_PASSWORD_LENGTH);
};

export const hasAtLeastOneLetter = (value: string) => {
    return /[a-zA-Z]/.test(value);
};

export const hasAtLeastOneNumber = (value: string) => {
    return /\d/.test(value);
};

export const hasAtLeastXCharacters = (value: string, x: number) => {
    return value.length >= x;
};


export const parseSignupData = (value: unknown): ParsedSignupData => {
    if (!value) {
        console.error(`argument to parseSignupData is falsey`);
        throw new Error(`Unexpected error. Please refresh the page`);
    }

    const data = value as SignupData;
    
    if (!('firstName' in data) || !isValidLength(data.firstName, MIN_NAME_LENGTH)) 
        throw new Error(nameErr);
    else if (!('lastName' in data) || !isValidLength(data.lastName, MIN_NAME_LENGTH)) 
        throw new Error(nameErr);
    else if (!('username' in data) || !isValidLength(data.username, MIN_USERNAME_LENGTH)) 
        throw new Error(usernameErr);
    else if (!('password' in data) || !isValidPassword(data.password)) 
        throw new Error(passwordErr);
    else if (!('verify' in data) || data.verify !== data.password)
        throw new Error(verifyErr);
    else return {
        username: data.username,
        name: data.firstName + ' ' + data.lastName,
        password: data.password
    };
};

const isValidLength = (value: unknown, minLength: number) => {
    return isString(value) && hasAtLeastXCharacters(value, minLength);
};