import React from "react";

export interface Note {
    _id: string,
    content: string,
    created: string,
}

export interface NewNote {
    content: string,
    created: string
}

export interface ActionPayload {
    type: string,
    payload: unknown,
}

export interface TokenData {
    token: string,
    username: string,
    name: string
}

export interface Credentials {
    username: string,
    password: string
}

export interface User {
    _id: string,
    username: string,
    name: string,
    passwordHash: string
}

export interface SubmitHandler {
    handleSubmit(e: React.FormEvent): void
}

export interface LoginFormViewFields {
    handleLogin(e: React.FormEvent): void;
    username: UseField,
    password: UseField,
    showSpinner: boolean,
}

export interface UseField {
    type: string,
    value: string,
    onChange(event: React.FormEvent<HTMLInputElement>): void,
    clearField(): void
}

export interface TimeoutObject {
    set(func: unknown, timeout: number): void,
    clear(): void;
}