export class User {
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly email: string;
    public readonly password: string;

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export interface AuthenticationState {
    user?: User;
    token?: string;
    isLoading: boolean;
    error?: string;
}

export function initialAuthenticationState(): AuthenticationState {
    // TODO if a token is already stored we should get the user information by token once available from backend
    //const storedToken = localStorage.getItem('token');
    return {error: "", isLoading: false};
}

export function storeToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem('token');
}

export interface AuthenticationResponse {
    user?: User;
    token?: string;
    error?: string;
}

export interface UserResponse {
    user?: User;
    status?: string;
    reason?: string;
}

export function isAuthenticated(authenticationState: AuthenticationState): boolean {
    if (!authenticationState) {
        return false;
    }
    if (!authenticationState.token) {
        return false;
    }
    if (authenticationState.token) {
        return true;
    }
    return false;
}