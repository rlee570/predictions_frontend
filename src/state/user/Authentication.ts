
export class User  {
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
    user?: User | null;
    token?: string | null;
    isLoading: boolean;
    error?: string;
}

export function initialAuthenticationState(): AuthenticationState {
    const storedToken = localStorage.getItem('token');
    // TODO if a token is already stored either get the user information from the backend by token or remove the stored token
    return {token: storedToken, error: "", isLoading: false};
}

export interface AuthenticationResponse {
    user?: User;
    token?: string;
    error?: string;
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