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
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    points: number;
    role: string;
}

// consolidate with user response once both server responses consistent
export interface CreateUserResponse extends BaseResponse {
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        points: number;
        role: string;
    }
}

export interface AuthenticationResponse extends BaseResponse {
    user: {
        id: number;
        email: string;
        token: string;
    }
}

export interface VoteResponse extends BaseResponse {
    vote?: Vote;
}

export interface StatisticsResponse extends BaseResponse {
    statistics?: Statistics;
}

