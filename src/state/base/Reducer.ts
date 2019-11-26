import {UserState} from "../user/User";
import {UserAction, UserActionType} from "../user/Action";
import {PredictionsState} from "../prediction/Prediction";
import {VoteState} from "../vote/Vote";
import {PredictionAction, PredictionActionType, StatisticsAction, StatisticsActionType} from "../prediction/Action";
import {VoteAction, VoteActionType} from "../vote/Action";
import {BaseState, ERROR_STATUS} from "./BaseState";
import util from "util";
import {produce} from "immer";
import {StatisticsState} from "../prediction/Statistics";

export function baseReducer(state: UserState | PredictionsState | VoteState | StatisticsState, action: UserAction | PredictionAction | VoteAction | StatisticsAction): BaseState {
    switch (action.type) {
        case UserActionType.LOGIN_FAILURE:
        case UserActionType.LOGOUT_FAILURE:
        case UserActionType.CREATE_USER_FAILURE:
        case UserActionType.GET_USER_FAILURE:
        case PredictionActionType.GET_ALL_PREDICTIONS_FAILURE:
        case StatisticsActionType.GET_STATISTICS_FAILURE:
        case VoteActionType.CREATE_VOTE_FAILURE:
            console.log("failure: " + util.inspect(action, false, null, true));
            let message: string = '';
            let status: string = ERROR_STATUS;

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