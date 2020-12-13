import { ActionTypes } from "src/store/actions/action-types";
import { NoteReducerActions, Note } from 'src/store/actions/notes/notes-actions';

export type NotesState = Note[];
const defaultState: NotesState = [];

export const notesReducer = (state: NotesState = defaultState, action: NoteReducerActions): NotesState => {
    switch (action.type) {
        case ActionTypes.ADD_NOTE: {
            return [action.data, ...state];
        }
        case ActionTypes.UPDATE_NOTE: {
            const newState = state.map((item) => {
                if (item.id === action.data.id) {
                    return action.data;
                }
                return item;
            });
            return newState;
        }
        case ActionTypes.DELETE_NOTE: {
            const newState = state.filter((item) => {
                return item.id !== action.id;
            });
            return newState;
        }
        case ActionTypes.RESET_NOTES: {
            return defaultState;
        }
        default:
            return state;
    }
};