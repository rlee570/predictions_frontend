import {BaseState} from "../BaseState";

export class Statistics {
    public readonly totalVotes: number;
    public readonly yesVotes: number;
    public readonly noVotes: number;

    constructor(totalVotes: number, yesVotes: number, noVotes: number) {
        this.totalVotes = totalVotes;
        this.yesVotes = yesVotes;
        this.noVotes = noVotes;
    }
}

export function initialStatisticsState(): StatisticsState {
    return { isLoading: false, statistics: {yesVotes: 0, noVotes: 0, totalVotes: 0} };
}

export interface StatisticsState extends BaseState {
    statistics?: Statistics;
}