import { UserReducerActions } from '../../actions/user/user-actions';
import { ActionTypes } from "src/store/actions/action-types";

export interface UserState {
    userName: string;
    password: string;
}
const defaultState: UserState = {
    userName: "",
    password: ""
};

export const userReducer = (state: UserState = defaultState, action: UserReducerActions): UserState => {
    switch (action.type) {
        case ActionTypes.SET_USERNAME:{
            
            return { ...state, userName: action.userName };
        }
        case ActionTypes.SET_PASSWORD:{

            return { ...state, password: action.password };
        }
        case ActionTypes.SIGN_OUT:{

            return { ...state, password: "", userName: "" };
        }
        default:
            return state;
    }
};