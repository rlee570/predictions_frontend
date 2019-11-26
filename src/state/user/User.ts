import {BaseState} from "../base/BaseState";

export class User {
    public readonly id: number;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly role: string;
    public readonly points: number;
    public static readonly DEFAULT_NO_POINTS = 100;

    constructor(id: number, firstName: string, lastName: string, email: string, role: string, points: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.points = points;
    }


}

export interface UserState extends BaseState {
    user?: User;
    token?: string;
}

export const ID_PARAM: string = 'id';
export const TOKEN_PARAM: string = 'token';
export const ADMIN_ROLE: string = 'ADMIN';
export const USER_ROLE: string = 'user';

export function initialUserState(): UserState {
    const storedToken = localStorage.getItem(TOKEN_PARAM);
    const storedId = localStorage.getItem(ID_PARAM);

    const initialUserState: UserState = {
        isLoading: false,
        token: undefined,
    }

    if (storedToken === null || storedId === null) {
        return initialUserState;
    }

    const token = storedToken.replace(/"/g, "");
    initialUserState.user = new User(Number(storedId), '', '', '', USER_ROLE, 0);
    initialUserState.token = token;

    return initialUserState;
}

export function storeUserData(token: string, id: number) {
    localStorage.setItem(TOKEN_PARAM, JSON.stringify(token));
    localStorage.setItem(ID_PARAM, JSON.stringify(id));
}

export function removeUserData() {
    localStorage.removeItem(TOKEN_PARAM);
    localStorage.removeItem(ID_PARAM);
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