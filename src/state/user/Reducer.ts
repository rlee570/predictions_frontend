import {ActionType, AuthenticationAction} from "./Action";
import produce from "immer";
import util from "util";
import {AuthenticationState, removeToken, storeToken} from "./Authentication";

// TODO handle storage of tokens once backend available
export function authenticationReducer(state: AuthenticationState, action: AuthenticationAction): AuthenticationState {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
        case ActionType.LOGOUT_REQUEST:
            //console.log("type: " + util.inspect(String(action.type), false, null, true));
            //console.log("old state: " + util.inspect(state, false, null, true));
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case ActionType.LOGIN_SUCCESS:
            storeToken("token");
            const newState = produce(state, draftState => {
                draftState.user = action.response.user;
                draftState.token = action.response.token;
                draftState.isLoading = false;
            });

            console.log("newState after login success: " + util.inspect(newState, false, null, true));
            return newState;
        case ActionType.LOGIN_FAILURE:
        case ActionType.LOGOUT_FAILURE:
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.error = action.error;
            });
        case ActionType.LOGOUT_SUCCESS:
            removeToken();
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.token = null;
                draftState.user = null;
            });
        default:
            return state;
    }
}

