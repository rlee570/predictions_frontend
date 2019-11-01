import {AuthenticationResponse, UserResponse} from "./Authentication";
import {AxiosError} from "axios";

export enum AuthenticationActionType {
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

export type AuthenticationAction =
    | { type: AuthenticationActionType.LOGIN_REQUEST }
    | { type: AuthenticationActionType.LOGIN_SUCCESS, response: AuthenticationResponse }
    | { type: AuthenticationActionType.LOGIN_FAILURE, errorResponse: AxiosError<AuthenticationResponse> }
    | { type: AuthenticationActionType.LOGOUT_REQUEST }
    | { type: AuthenticationActionType.LOGOUT_SUCCESS }
    | { type: AuthenticationActionType.LOGOUT_FAILURE, errorResponse: AxiosError<AuthenticationResponse> }
    | { type: AuthenticationActionType.CREATE_USER_REQUEST }
    | { type: AuthenticationActionType.CREATE_USER_SUCCESS, response: UserResponse }
    | { type: AuthenticationActionType.CREATE_USER_FAILURE, errorResponse: AxiosError<UserResponse> }
