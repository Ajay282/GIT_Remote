import { ActionTypes } from "src/store/actions/action-types";
import { Customer, CustomerActions } from "src/store/actions/customers/customer-actions";
import { NotesState } from "../notes/notes-reducer";

export type CustomersState = Customer[];
const defaultState: CustomersState = [];

export const customerReducer = (state: CustomersState = defaultState, action: CustomerActions): CustomersState => {
    switch (action.type) {
        case ActionTypes.ADD_CUSTOMER: {
            return [action.data, ...state];
        }
        case ActionTypes.REMOVE_CUSTOMER: {
            const newState = state.filter((item) => {
                return item.id !== action.id;
            });
            return newState;
        }
        case ActionTypes.RESET_CUSTOMERS: {
            return defaultState;
        }
        default:
            return state;
    }
};