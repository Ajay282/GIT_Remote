import { ActionTypes } from "../action-types";

export interface Note {
    title: string;
    createdAt: number;
    id: number;
    status: FilterType;
}

enum FilterType {
    ALL,
    ACTIVE,
    COMPLETED,
}

export interface AddNote {
    type: ActionTypes.ADD_NOTE;
    data: Note;
}
export interface UpdateNote {
    type: ActionTypes.UPDATE_NOTE;
    data: Note;
}
export interface DeleteNote {
    type: ActionTypes.DELETE_NOTE;
    id: number;
}

export const addNote: (data: Note) => AddNote = (data) => ({
    type: ActionTypes.ADD_NOTE,
    data
});
export const updateNote: (data: Note) => UpdateNote = (data) => ({
    type: ActionTypes.UPDATE_NOTE,
    data
});
export const deleteNote: (id: number) => DeleteNote = (id) => ({
    type: ActionTypes.DELETE_NOTE,
    id
});

export type NoteReducerActions = AddNote | UpdateNote | DeleteNote;