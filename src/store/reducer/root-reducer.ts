import { combineReducers } from "redux";
import { userReducer, UserState } from "src/store/reducer/user/user-reducer";
import { NotesState, notesReducer } from "./notes/notes-reducer";
import { CustomersState, customerReducer } from "./customers/customer-reducer";

export interface AppState {
    user: UserState;
    notes: NotesState;
    customers: CustomersState;
}

export const rootReducer = combineReducers<AppState>({
    user: userReducer,
    notes: notesReducer,
    customers: customerReducer

});