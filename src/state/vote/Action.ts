import {AxiosError} from "axios";
import {VoteResponse} from "../../service/Response";

export enum VoteActionType {
    CREATE_VOTE_REQUEST,
    CREATE_VOTE_SUCCESS,
    CREATE_VOTE_FAILURE
}

export type VoteAction =
    | { type: VoteActionType.CREATE_VOTE_REQUEST }
    | { type: VoteActionType.CREATE_VOTE_SUCCESS, response: VoteResponse }
    | { type: VoteActionType.CREATE_VOTE_FAILURE, errorResponse: AxiosError<VoteResponse> }
