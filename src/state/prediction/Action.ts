import {AxiosError} from "axios";
import {PredictionsResponse, StatisticsResponse} from "../../service/Response";


export enum PredictionActionType {
    GET_ALL_PREDICTIONS_REQUEST,
    GET_ALL_PREDICTIONS_SUCCESS,
    GET_ALL_PREDICTIONS_FAILURE
}

export enum PredictionOutcomeActionType {
    PUT_PREDICTION_OUTCOME_REQUEST,
    PUT_PREDICTION_OUTCOME_SUCCESS,
    PUT_PREDICTION_OUTCOME_FAILURE
}

export type PredictionAction =
    | { type: PredictionActionType.GET_ALL_PREDICTIONS_REQUEST }
    | { type: PredictionActionType.GET_ALL_PREDICTIONS_SUCCESS, response: PredictionsResponse}
    | { type: PredictionActionType.GET_ALL_PREDICTIONS_FAILURE, errorResponse: AxiosError<PredictionsResponse> }
    | { type: PredictionOutcomeActionType.PUT_PREDICTION_OUTCOME_REQUEST }
    | { type: PredictionOutcomeActionType.PUT_PREDICTION_OUTCOME_SUCCESS, response: PredictionsResponse }
    | { type: PredictionOutcomeActionType.PUT_PREDICTION_OUTCOME_FAILURE, errorResponse: AxiosError<PredictionsResponse> }

export enum StatisticsActionType {
    GET_STATISTICS_REQUEST,
    GET_STATISTICS_SUCCESS,
    GET_STATISTICS_FAILURE
}

export type StatisticsAction =
    | { type: StatisticsActionType.GET_STATISTICS_REQUEST }
    | { type: StatisticsActionType.GET_STATISTICS_SUCCESS, response: StatisticsResponse }
    | { type: StatisticsActionType.GET_STATISTICS_FAILURE, errorResponse: AxiosError<StatisticsResponse> }
