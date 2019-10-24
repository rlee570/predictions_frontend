import {User} from "./User";
import util from "util";
import produce from "immer";

export interface AuthenticationState {
    user?: User | null;
    token?: string | null;
    isLoading: boolean;
    error?: string;
}

export function initialAuthenticationState(): AuthenticationState {
    const storedToken = localStorage.getItem('token');
    // TODO if a token is already stored either get the user from the backend by token or remove the stored token
    return {token: storedToken, error: "", isLoading: false};
}

export interface AuthenticationResponse {
    user?: User;
    token?: string ;
    error?: string;
}

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


export function authenticationReducer(state: AuthenticationState, action: AuthenticationAction): AuthenticationState {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST || ActionType.LOGOUT_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case ActionType.LOGIN_SUCCESS:
            localStorage.setItem('token', JSON.stringify("token"));
            const newState = produce(state, draftState => {
                draftState.user = action.response.user;
                draftState.token = action.response.token;
                draftState.isLoading = false;
            });

            console.log("newState after login success: " + util.inspect(newState, false, null, true));
            return newState;
        case ActionType.LOGIN_FAILURE || ActionType.LOGOUT_FAILURE:
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.error = action.error;
            });
        case ActionType.LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.token = null;
                draftState.user = null;
            });
        default:
            return state;
    }
}

