import axios from 'axios';
import { Note } from '../types';
import { isNote } from '../validators/noteValidators';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
    try {
        const { data: notes } = await axios.get<Note[]>(baseUrl);
        return notes;
    } catch(e) {
        console.log(`Error retrieving notes: ${e.message}`);
    }
};

const addNew = async (note: Note) => {
    try {
        if (!isNote(note)) throw new Error('Incorrect or missing note data');

        const savedNote = await axios.post<Note>(baseUrl, note);
        return savedNote;
    } catch(e) {
        console.log(`Error adding notes: ${e.message}`);
    }
};

export default {
    getAll,
    addNew
};