import {User} from "../state/user/Authentication";
import {SignUpData} from "../components/SignUpForm";

export const userService = {
    createUser,
};

function createUser(userData: SignUpData): User {
    return new User(userData.firstName, userData.lastName, userData.email, userData.password);
}

