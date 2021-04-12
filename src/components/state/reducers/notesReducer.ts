import notesService from "../../../services/notesService";
import { isNotesArray } from "../../../validators/noteValidators";
import { AppDispatch } from "../store";

const reducer = 
    (state = [], { type, payload }: { type: string, payload: unknown }) => {
    switch(type) {
        case 'notes/initialize': {
            if (Array.isArray(payload) && isNotesArray(payload)) {
                return [...payload];
            }
            console.log(`Invalid notes data: ${JSON.stringify(payload)}`);
            return [...state];
        }
        default: 
            return [...state];
    }
};

export const initialize = () => async (dispatch: AppDispatch) => {
    const notes = await notesService.getAll();
    console.log(`notes=${JSON.stringify(notes)}`);
    dispatch({
        type: 'notes/initialize',
        payload: notes
    });
};

export default reducer;