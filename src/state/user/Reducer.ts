import {UserAction, UserActionType} from "./Action";
import produce from "immer";
import util from "util";
import {storeUserData, User, USER_ROLE, UserState} from "./User";

export function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionType.LOGIN_REQUEST:
        case UserActionType.LOGOUT_REQUEST:
        case UserActionType.CREATE_USER_REQUEST:
        case UserActionType.GET_USER_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case UserActionType.LOGIN_SUCCESS:
            console.log("login success action: " + util.inspect(action, false, null, true));
            const user = new User(action.response.user.id, "", "", action.response.user.email, USER_ROLE, 0);
            const newState = produce(state, draftState => {
                draftState.user = user;
                draftState.token = action.response.user.token;
                draftState.isLoading = false;
            });
            if (newState.token && newState.user) {
                storeUserData(newState.token, newState.user.id);
            } else {
                throw new Error('Login success but no user token!')
            }
            console.log("newState after login success: " + util.inspect(newState, false, null, true));
            return newState;
        case UserActionType.CREATE_USER_SUCCESS:
            console.log("create user action: " + util.inspect(action, false, null, true));
            const newUser = new User(action.response.user.id, action.response.user.first_name, action.response.user.last_name, action.response.user.email, action.response.user.role, action.response.user.points);
            console.log("newUser: " + util.inspect(newUser, false, null, true));
            const newUserState = produce(state, draftState => {
                draftState.user = newUser;
                draftState.isLoading = false;
            });
            console.log("create user action, new user state: " + util.inspect(newUserState, false, null, true));
            return newUserState;
        case UserActionType.GET_USER_SUCCESS:
            console.log("get user success: " + util.inspect(action, false, null, true));
            const existingUser = new User(action.response.id, action.response.first_name, action.response.last_name, action.response.email, action.response.role, action.response.points);
            return produce(state, draftState => {
                draftState.user = existingUser;
                draftState.isLoading = false;
            });
        case UserActionType.LOGOUT_SUCCESS:
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.token = undefined;
                draftState.user = undefined;
            });
        case UserActionType.LOGIN_FAILURE:
        case UserActionType.LOGOUT_FAILURE:
        case UserActionType.CREATE_USER_FAILURE:
        case UserActionType.GET_USER_FAILURE:
            // TODO error handling: read error message from backend once available
            console.log("failure: " + util.inspect(action, false, null, true));
            let message: string = '';
            let status: string = 'error';

            if (action.errorResponse.isAxiosError) {
                message = action.errorResponse.message;
            }
            if (action.errorResponse.response && action.errorResponse.response.data.reason) {
                message = action.errorResponse.response.data.reason;
            }
            if (action.errorResponse.response && action.errorResponse.response.data.status) {
                status = action.errorResponse.response.data.status;
            }

            console.log("message = ", message);

            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.reason = message;
                draftState.status = status;
            });
        default:
            return state;
    }
}

