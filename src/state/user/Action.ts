import {AxiosError} from "axios";
import {UserResponse} from "../../service/Response";

export enum UserActionType {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
}

export type UserAction =
    | { type: UserActionType.LOGIN_REQUEST }
    | { type: UserActionType.LOGIN_SUCCESS, response: UserResponse }
    | { type: UserActionType.LOGIN_FAILURE, errorResponse: AxiosError<UserResponse> }
    | { type: UserActionType.LOGOUT_REQUEST }
    | { type: UserActionType.LOGOUT_SUCCESS }
    | { type: UserActionType.LOGOUT_FAILURE, errorResponse: AxiosError<UserResponse> }
    | { type: UserActionType.CREATE_USER_REQUEST }
    | { type: UserActionType.CREATE_USER_SUCCESS, response: UserResponse }
    | { type: UserActionType.CREATE_USER_FAILURE, errorResponse: AxiosError<UserResponse> }
