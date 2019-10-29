import {ActionType, AuthenticationAction} from "./Action";
import produce from "immer";
import util from "util";
import {AuthenticationState} from "./Authentication";

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