import {BaseState} from "../BaseState";

export class User {
    public readonly id: number;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly password: string;
    public readonly role: Role;
    public readonly points: number;
    public static readonly DEFAULT_NO_POINTS = 100;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, role: Role, points: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.points = points;
    }
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

export interface UserState extends BaseState {
    user?: User;
    token?: string;
}

export function initialUserState(): UserState {
    // TODO if a token is already stored we should get the user using the token information once available from backend
    const storedToken = localStorage.getItem('token');
    return {isLoading: false, token: storedToken ? storedToken: undefined};
}

export function storeToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function isAuthenticated(userState: UserState): boolean {
    if (!userState) {
        return false;
    }
    if (!userState.token) {
        return false;
    }
    if (userState.token) {
        return true;
    }
    return false;
}