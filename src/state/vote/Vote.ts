import {User} from "../user/User";
import {BaseState} from "../BaseState";
import {Prediction} from "../prediction/Prediction";

export class Vote {
    public readonly id: number;
    public readonly prediction: Prediction;
    public readonly user: User;
    public readonly points: number;
    public readonly vote: boolean;

    constructor(id: number, prediction: Prediction, user: User, points: number, vote: boolean) {
        this.id = id;
        this.prediction = prediction;
        this.user = user;
        this.points = points;
        this.vote = vote;
    }

}

export function initialVoteState(): VoteState {
    return { isLoading: false };
}

export interface VoteState extends BaseState {
    vote?: Vote;
}






