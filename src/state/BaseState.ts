export interface BaseState {
    isLoading: boolean;
    status?: string;
    reason?: string;
}

export enum Status {
    ERROR = 'error',
}