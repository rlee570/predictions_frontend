import {PredictionsState} from "./Prediction";
import {PredictionAction, PredictionActionType, StatisticsAction, StatisticsActionType} from "./Action";
import {produce} from "immer";
import {StatisticsState} from "./Statistics";

export function predictionsReducer(state: PredictionsState, action: PredictionAction): PredictionsState {
    switch (action.type) {
        case PredictionActionType.GET_ALL_PREDICTIONS_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case PredictionActionType.GET_ALL_PREDICTIONS_SUCCESS:
            return produce(state, draftState => {
                draftState.predictions = action.response.predictions;
                draftState.isLoading = false;
            });
        case PredictionActionType.GET_ALL_PREDICTIONS_FAILURE:
            // TODO error handling
            console.log("get all predictions failure");
            return state;
        default:
            return state;
    }
}

export function statisticsReducer(state: StatisticsState, action: StatisticsAction): StatisticsState {
    switch (action.type) {
        case StatisticsActionType.GET_STATISTICS_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case StatisticsActionType.GET_STATISTICS_SUCCESS:
            return produce(state, draftState => {
                draftState.statistics = action.response.statistics;
                draftState.isLoading = false;
            });
        case StatisticsActionType.GET_STATISTICS_FAILURE:
            // TODO error handling
            console.log("get statistics failure");
            return state;
        default:
            return state;
    }
}