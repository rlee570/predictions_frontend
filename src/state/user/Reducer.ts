import {AuthenticationAction, AuthenticationActionType} from "./Action";
import produce from "immer";
import util from "util";
import {AuthenticationState, removeToken, storeToken} from "./Authentication";

// TODO handle storage of tokens once backend available
export function authenticationReducer(state: AuthenticationState, action: AuthenticationAction): AuthenticationState {
    switch (action.type) {
        case AuthenticationActionType.LOGIN_REQUEST:
        case AuthenticationActionType.LOGOUT_REQUEST:
        case AuthenticationActionType.CREATE_USER_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case AuthenticationActionType.LOGIN_SUCCESS:
            storeToken("token");
            const newState = produce(state, draftState => {
                draftState.user = action.response.user;
                draftState.token = action.response.token;
                draftState.isLoading = false;
            });

            console.log("newState after login success: " + util.inspect(newState, false, null, true));
            return newState;
        case AuthenticationActionType.CREATE_USER_SUCCESS:
            return produce(state, draftState => {
                draftState.user = action.response.user;
                draftState.isLoading = false;
            });
        case AuthenticationActionType.LOGIN_FAILURE:
        case AuthenticationActionType.LOGOUT_FAILURE:
        case AuthenticationActionType.CREATE_USER_FAILURE:
            // TODO read error message from backend once available
            let message: string = '';
            if (action.errorResponse.isAxiosError) {
                message = action.errorResponse.message;
            }
            if (action.errorResponse.response) {
                message = "TODO: display here the error message from the backend once available.";
            }
            // else {
            //     message = "Please enter the correct login or password.";
            // }

            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.error = message;
            });
        case AuthenticationActionType.LOGOUT_SUCCESS:
            removeToken();
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.token = undefined;
                draftState.user = undefined;
            });
        default:
            return state;
    }
}

