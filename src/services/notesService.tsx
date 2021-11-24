import axios, { AxiosError } from 'axios';
import { Note, NewNote, NoteIdPosition } from '../types';
import { getStoredToken } from '../state/reducers/login';

const baseUrl = 'http://localhost:3001/notes';

export const UPDATE_POSITION = "POSITION";
export const UPDATE_CONTENT = "CONTENT";
type UpdateType = typeof UPDATE_POSITION | typeof UPDATE_CONTENT;

const update = async (toUpdate: NoteIdPosition[] | Note, type: UpdateType) => {
    let url = baseUrl;
    switch(type) {
        case UPDATE_POSITION: {
            url += '/position';
            break;
        }
        case UPDATE_CONTENT: {
            url += '/content';
            break;
        }
        default: {
            const _exhaustiveCheck: never = type;
            return _exhaustiveCheck;
        }
    }
    const response = await axios.put(url, toUpdate);
    return response;
};

const getAll = async () => {
    const tokenData = getStoredToken();
    if (tokenData) {
        const header = {headers: {'authorization': tokenData.token}};
        
        const { data: notes } = await axios.get<Note[]>(
            baseUrl,
            header
        );
        return notes;
    } else return null;
};

const addNew = async (note: NewNote) => {
    const tokenData = getStoredToken();
    try {
        if (tokenData) {
            const body = {
                note, 
                token: tokenData.token
            };

            const { data } = await axios.post<Note>(baseUrl, body);

            return data;
        } else throw new Error(`Failed to add note, user currently not logged in`);
    } catch(e) {
        throw new Error((e as AxiosError).response?.data);
    }
    
};

//Note deletion fails from here onwards
const remove = async (noteId: string, toUpdate: NoteIdPosition[]) => { 
    const tokenData = getStoredToken();
    if (tokenData) {
        const data = tokenData.token;
        const response = await axios.delete(
            `${baseUrl}/${noteId}`,
            {data: {
                token: data,
                toUpdate
            }}
        );
        return response;
    } else {
        throw new Error(`Failed to delete note, user currently not logged in`);
    }
};

export default {
    getAll,
    addNew,
    remove,
    update
};