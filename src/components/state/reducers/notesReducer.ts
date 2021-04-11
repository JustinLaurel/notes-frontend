import { Note } from "../../../types";
import { isNotesArray } from "../../../validators/noteValidators";
import { AppDispatch } from "./store";

const reducer = (state: Note[] = [], action) => {
    switch(action.type) {
        case 'INITIALIZE_NOTES': {
            if (isNotesArray(action.payload)) {
                return [
                    ...state,
                    ...action.payload
                ];
            }
            return 
        }
        default: 
            return state;
    }
}

export const initializeNotes = (notes: Note[]) => (dispatch: AppDispatch) => {
    dispatch({
        type: 'INITIALIZE_NOTES',
        payload: notes
    });
};

export default reducer;