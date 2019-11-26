import {Prediction, PredictionsState} from "./Prediction";
import {PredictionAction, PredictionActionType, StatisticsAction, StatisticsActionType} from "./Action";
import {produce} from "immer";
import {Statistics, StatisticsState} from "./Statistics";
import util from "util";
import {baseReducer} from "../base/Reducer";

export function predictionReducer(state: PredictionsState, action: PredictionAction): PredictionsState {
    switch (action.type) {
        case PredictionActionType.GET_ALL_PREDICTIONS_REQUEST:
            return produce(state, draftState => {
                draftState.isLoading = true;
            });
        case PredictionActionType.GET_ALL_PREDICTIONS_SUCCESS:
            // the response data is an unnamed JSON array
            const arr = action.response as Array<any>;
            const predictions = new Array<Prediction>();
            arr.map(x => {
                const prediction = new Prediction(x.id, x.owner, x.statement, x.expiry);
                predictions.push(prediction);
            } );

            return produce(state, draftState => {
                draftState.predictions = predictions;
                draftState.isLoading = false;
            });
        case PredictionActionType.GET_ALL_PREDICTIONS_FAILURE:
            return baseReducer(state, action);
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
            const statistics = new Statistics(action.response.total_votes, action.response.yes_votes, action.response.no_votes);
            const newState = produce(state, draftState => {
                draftState.statistics = statistics;
                draftState.isLoading = false;
            });
            console.log("new state stats success: " + util.inspect(newState, false, null, true));
            return newState;
        case StatisticsActionType.GET_STATISTICS_FAILURE:
            return baseReducer(state, action);
        default:
            return state;
    }
}