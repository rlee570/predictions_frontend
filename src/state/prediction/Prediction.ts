import {User} from "../user/User";
import {BaseState} from "../base/BaseState";
import moment from "moment";

export class Prediction {
    public readonly id: number;
    public readonly owner: number;
    public readonly statement: string;
    public readonly expiry: Date;
    public outcome?: boolean;

    //public readonly votes?: Vote[];

    constructor(id: number, owner: number, statement: string, expiry: Date) {
        this.id = id;
        this.owner = owner;
        this.statement = statement;
        this.expiry = expiry;
    }
}

export function isExpired(prediction: Prediction): boolean {
    if (moment().isAfter(prediction.expiry)) {
        return true;
    } else {
        return false;
    }
}

export function notEnoughPoints(user: User): boolean {
    return (user.points <= 0);
}

export function getOutcomeLabel(prediction: Prediction): string {
    if (!isExpired(prediction)) {
        return '';
    }
    if (prediction.outcome) {
        return prediction.outcome ? 'Outcome: Yes' : 'Outcome: No';
    } else {
        return 'Awaiting outcome';
    }
}


export function initialPredictionsState(): PredictionsState {
    return {isLoading: false};
}

export interface PredictionsState extends BaseState {
    predictions?: Prediction[];
}




