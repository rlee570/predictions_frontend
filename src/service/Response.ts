interface BaseResponse {
    status?: string;
    reason?: string;
}

export interface PredictionsResponse extends BaseResponse {
    data?: [{
        id: number;
        outcome: boolean;
        owner: number;
        statement: string;
    }];
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
    id: number;
    prediction: number;
    user_id: number;
    points: number;
    outcome: boolean;
}

export interface StatisticsResponse extends BaseResponse {
    total_votes: number;
    no_votes: number;
    yes_votes: number;
}

