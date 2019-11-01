import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import {User} from "../state/user/Authentication";

const clientInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT + process.env.REACT_APP_API_BASE_PREFIX,
});

export const userApi = {
    login: (email: string, password: string) => clientInstance.post('/user/login', {email, password}),
    createUser: (newUser: User) => clientInstance.post('/user', {email: newUser.email, password: newUser.password, first_name: newUser.firstName, last_name: newUser.lastName}),
}

if (process.env.REACT_APP_API_MOCK === 'true' && process.env.NODE_ENV !== 'production') {
    const mock = new MockAdapter(clientInstance, { delayResponse: 1000 });

    mock.onPost('/user/login').reply(function (config) {
        const params = JSON.parse(config.data);
        const mockUser = new User('test', 'test', params.email, params.password);
        // return an array in the form of [status, data, headers]
        return [200, {
            user: mockUser,
            token: 'token',
        }];
    });

    mock.onPost('/user').reply(function (config) {
        const params = JSON.parse(config.data);
        const mockUser = new User(params.first_name, params.last_name, params.email, params.password);
        return [200, {
            user: mockUser,
        }];
    });
}







