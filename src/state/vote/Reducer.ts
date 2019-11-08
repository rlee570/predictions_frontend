import {produce} from "immer";
import {VoteState} from "./Vote";
import {VoteAction, VoteActionType} from "./Action";
import util from "util";

export function voteReducer(state: VoteState, action: VoteAction): VoteState {
    switch (action.type) {
        case VoteActionType.CREATE_VOTE_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case VoteActionType.CREATE_VOTE_SUCCESS:
            console.log("create vote success: " + util.inspect(action.response.vote, false, null, true));
            return produce(state, draftState => {
                draftState.vote = action.response.vote;
                draftState.isLoading = false;
            });
        case VoteActionType.CREATE_VOTE_FAILURE:
            // TODO error handling
            console.log("create vote failure");
            return produce(state, draftState => {
                draftState.isLoading = false;
                draftState.error = "create vote failure";
            });
        default:
            return state;
    }
}