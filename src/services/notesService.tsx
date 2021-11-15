import axios from 'axios';
import { Note, NewNote } from '../types';
import { getStoredToken } from '../state/reducers/login';

const baseUrl = 'http://localhost:3001/notes';

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
    if (tokenData) {
        const body = {
            note, 
            token: tokenData.token
        };

        const { data } = await axios.post<Note>(baseUrl, body);

        return data;
    } else {
        throw new Error(`Failed to add note, user currently not logged in`);
    }
};

const remove = async (id: string) => {
    const tokenData = getStoredToken();
    if (tokenData) {
        const data = tokenData.token;
        const response = await axios.delete(
            `${baseUrl}/${id}`,
            {data: {data}}
        );
        return response;
    } else {
        throw new Error(`Failed to delete note, user currently not logged in`);
    }
};

export default {
    getAll,
    addNew,
    remove
};