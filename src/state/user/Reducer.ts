import {UserAction, UserActionType} from "./Action";
import produce from "immer";
import util from "util";
import {storeToken, UserState} from "./User";

// TODO handle storage of tokens once backend available
export function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionType.LOGIN_REQUEST:
        case UserActionType.LOGOUT_REQUEST:
        case UserActionType.CREATE_USER_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case UserActionType.LOGIN_SUCCESS:
            storeToken("token");
            const newState = produce(state, draftState => {
                draftState.user = action.response.user;
                draftState.token = action.response.token;
                draftState.isLoading = false;
            });

            console.log("newState after login success: " + util.inspect(newState, false, null, true));
            return newState;
        case UserActionType.CREATE_USER_SUCCESS:
            return produce(state, draftState => {
                draftState.user = action.response.user;
                draftState.isLoading = false;
            });
        case UserActionType.LOGIN_FAILURE:
        case UserActionType.LOGOUT_FAILURE:
        case UserActionType.CREATE_USER_FAILURE:
            // TODO error handling: read error message from backend once available
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
        case UserActionType.LOGOUT_SUCCESS:
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.token = undefined;
                draftState.user = undefined;
            });
        default:
            return state;
    }
}

