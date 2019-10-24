import {User} from "../state/User";
import {AuthenticationResponse, AuthenticationState} from "../state/Authentication";
import {SignUpData} from "../components/SignUpForm";

export const userService = {
    login,
    isAuthenticated,
    createUser,
};

function login(email: string, password: string): AuthenticationResponse {
    const user = new User('', '', email, "");

    if (user.email === 'test') {
        return {user: user, token: "token", error:""};
    }

    return {error: "login failed!"};
}

function createUser(userData: SignUpData): User {
    return new User(userData.firstName, userData.lastName, userData.email, userData.password);
}

function isAuthenticated(authenticationState: AuthenticationState): boolean {
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

