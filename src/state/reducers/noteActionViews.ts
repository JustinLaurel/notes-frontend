
import { ActionPayload } from '../../types';
import { isString } from '../../validators/parsers';
import { AppDispatch } from '../store';

const baseEditType = 'noteActionViews/editing';

interface ActionState {
    isEditing: boolean,
    noteId: string | null,
}
const reducer = (state = {isEditing: false, noteId: null} as ActionState, { type, payload }: ActionPayload) => {
    switch(type) {
        case `${baseEditType}/set`: {
            if (isString(payload)) {
                return {...state, isEditing: true, noteId: payload};
            } else {
                console.log(`Invalid noteId: ${JSON.stringify(payload)}`);
                return {...state};
            }
        }
        case `${baseEditType}/reset`: {
            return {...state, isEditing: false, noteId: null};
        }
        default: return {...state};
    }
};


export const setEditMode = (noteId: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: `${baseEditType}/set`,
        payload: noteId
    });
};

export const stopEditMode = () => (dispatch: AppDispatch) => {
    dispatch({type: `${baseEditType}/reset`});
};

export default reducer;