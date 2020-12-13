import { Note, NoteReducerActions } from "src/store/actions/notes/notes-actions";
import { ActionTypes } from "src/store/actions/action-types";

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
        default:
            return state;
    }
};