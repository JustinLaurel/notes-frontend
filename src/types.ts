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