import React from "react";

export interface NewNote {
    position: string,
    content: string,
    created: string
}

export interface Note extends NewNote {
    _id: string,
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

export interface NoteIdPosition {
    position: string,
    _id: string,
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

export interface SignupData {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    verify: string
}

export interface ParsedSignupData {
    username: string,
    name: string,
    password: string
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

export interface SignupFormViewFields {
    firstName: UseField,
    lastName: UseField,
    username: UseField,
    password: UseField,
    verify: UseField,
    handleSignup(e: React.FormEvent): void,
    spinnerVisible: boolean,

}

export interface TooltipFields {
    password: UseField
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

export interface VisibilityToggler {
    toggleVisibility: () => void 
}

export interface PositionPayload {
    activeIndex: number,
    overIndex: number
}

export interface UpdatePayload {
    match: string,
    note: Note
}

export interface Pad {
    _id: string,
    content: string,
    user: string,
}