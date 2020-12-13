import * as constants from "src/store/actions/action-types";
import { ActionTypes } from "src/store/actions/action-types";

export interface SetUserName {
    type: ActionTypes.SET_USERNAME;
    userName: string;
}
export interface SetPassword {
    type: ActionTypes.SET_PASSWORD;
    password: string;
}
export interface ResetUserDetails {
    type: ActionTypes.SIGN_OUT;
}

export const setUserName: (name: string) => SetUserName = (name) => ({
    type: constants.ActionTypes.SET_USERNAME,
    userName: name
});
export const setPassword: (name: string) => SetPassword = (password) => ({
    type: constants.ActionTypes.SET_PASSWORD,
    password: password
});
export const resetUserDetails: () => ResetUserDetails = () => ({
    type: ActionTypes.SIGN_OUT
});

export type UserReducerActions = SetUserName | SetPassword | ResetUserDetails;