import axios from 'axios';
import { Note, NewNote } from '../types';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
    const { data: notes } = await axios.get<Note[]>(baseUrl);
    return notes;
};

const addNew = async (note: NewNote) => {
    const { data } = await axios.post<Note>(baseUrl, note);
    return data;
};

const remove = async (id: string) => {
    const deletedNote = await axios.delete(`${baseUrl}/${id}`);
    return deletedNote;
};

export default {
    getAll,
    addNew,
    remove
};