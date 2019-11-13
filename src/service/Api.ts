import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import {ADMIN_ROLE, User, USER_ROLE} from "../state/user/User";
import {Vote} from "../state/vote/Vote";
import {Statistics} from "../state/prediction/Statistics";
import {Prediction} from "../state/prediction/Prediction";

const loginEndpoint: string = '/user/login';
const userEndpoint: string = '/user';
const getAllPredictionsEndpoint: string = '/predictions';
const createVoteEndpoint: string = '/vote';
const getStatisticsEndpoint: string = '/statistics';


const clientInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT + process.env.REACT_APP_API_BASE_PREFIX,
});

export const userApi = {
    login: (email: string, password: string) => clientInstance.post(loginEndpoint, {email, password}),
    createUser: (firstName: string, lastName: string, email: string, password: string) => clientInstance.post(userEndpoint, {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
    }),
    getUserById: (id: number, token: string) => clientInstance.get(`${userEndpoint}/${id}`,
        {headers: {"Authorization" : `Token ${token}`}}),
}

export const predictionApi = {
    getAllPredictions: () => clientInstance.get(getAllPredictionsEndpoint),
}

export const voteApi = {
    createVote: (predictionId: number, user_id: number, points: number, outcome: boolean) => clientInstance.post(createVoteEndpoint, {
        prediction: predictionId,
        user_id: user_id,
        points: points,
        outcome: outcome
    }),
}

export const statisticsApi = {
    getStatistics: (predictionId: number) => clientInstance.get(getStatisticsEndpoint,
        {params: {predictionId}}),
}

if (process.env.REACT_APP_API_MOCK === 'true' && process.env.NODE_ENV !== 'production') {
    const mock = new MockAdapter(clientInstance, {delayResponse: 500});

    mock.onPost(loginEndpoint).reply(function (config) {
        const params = JSON.parse(config.data);
        const mockUser = new User(0, 'test', 'test', params.email, ADMIN_ROLE, User.DEFAULT_NO_POINTS);
        // return array: [status, data, headers]
        return [200, {
            user: mockUser,
            token: 'token',
        }];
    });

    mock.onPost(userEndpoint).reply(function (config) {
        const params = JSON.parse(config.data);
        const mockUser = new User(0, params.first_name, params.last_name, params.email, USER_ROLE, User.DEFAULT_NO_POINTS);
        return [200, {
            user: mockUser,
        }];
    });

    mock.onGet(getAllPredictionsEndpoint).reply(function (config) {
        const mockOwner = new User(0, 'test', 'test', 'test@gmail.com', USER_ROLE, User.DEFAULT_NO_POINTS);

        const allPredictions: Prediction[] = [];

        for (let i: number = 2018; i <= 2022; i++) {
            const date = new Date(i, 11, 2, 5, 10, 10, 0);
            const aPrediction = new Prediction(i, mockOwner, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur?', date);
            allPredictions.push(aPrediction);
        }

        return [200, {
            predictions: allPredictions,
        }];
    });

    mock.onPost(createVoteEndpoint).reply(function (config) {
        const params = JSON.parse(config.data);
        const mockVote = new Vote(0, params.prediction, params.user_id, params.points, params.outcome);
        return [200, {
            vote: mockVote,
        }];
    });

    mock.onGet(getStatisticsEndpoint).reply(function (config) {
        const mockStatistics = new Statistics(200, 50, 150);

        return [200, {
            statistics: mockStatistics,
        }];
    });


}







