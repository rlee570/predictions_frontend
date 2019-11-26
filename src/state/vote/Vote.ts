import {BaseState} from "../base/BaseState";

export class Vote {
    public readonly id: number;
    public readonly prediction: number;
    public readonly user: number;
    public readonly points: number;
    public readonly vote: boolean;

    constructor(id: number, prediction: number, user: number, points: number, vote: boolean) {
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






