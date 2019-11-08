import {User} from "../state/user/User";
import {Vote} from "../state/vote/Vote";
import {Statistics} from "../state/prediction/Statistics";
import {Prediction} from "../state/prediction/Prediction";

interface BaseResponse {
    status?: string;
    reason?: string;
}

export interface PredictionsResponse extends BaseResponse {
    predictions?: Prediction[];
}

export interface UserResponse extends BaseResponse {
    user?: User;
    token?: string;
}

export interface VoteResponse extends BaseResponse {
    vote?: Vote;
}

export interface StatisticsResponse extends BaseResponse {
    statistics?: Statistics;
}

