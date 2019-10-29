import {AuthenticationResponse} from "./Authentication";

export enum ActionType {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
}

export type AuthenticationAction =
    | { type: ActionType.LOGIN_REQUEST }
    | { type: ActionType.LOGIN_SUCCESS, response: AuthenticationResponse }
    | { type: ActionType.LOGIN_FAILURE, error: string }
    | { type: ActionType.LOGOUT_REQUEST }
    | { type: ActionType.LOGOUT_SUCCESS }
    | { type: ActionType.LOGOUT_FAILURE, error: string };