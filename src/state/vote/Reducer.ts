import {produce} from "immer";
import {Vote, VoteState} from "./Vote";
import {VoteAction, VoteActionType} from "./Action";
import util from "util";
import {baseReducer} from "../base/Reducer";

export function voteReducer(state: VoteState, action: VoteAction): VoteState {
    switch (action.type) {
        case VoteActionType.CREATE_VOTE_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case VoteActionType.CREATE_VOTE_SUCCESS:
            console.log("create vote success: " + util.inspect(action.response, false, null, true));
            const vote = new Vote(action.response.id, action.response.prediction, action.response.user_id, action.response.points, action.response.outcome);
            const newState = produce(state, draftState => {
                draftState.vote = vote;
                draftState.isLoading = false;
            });
            console.log("new state: " + util.inspect(newState, false, null, true));
            return newState;
        case VoteActionType.CREATE_VOTE_FAILURE:
            return baseReducer(state, action);
        default:
            return state;
    }
}