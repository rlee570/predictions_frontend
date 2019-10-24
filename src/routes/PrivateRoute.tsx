import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {StateContext} from "../state/StateProvider";
import {userService} from "../services/UserService";

interface Props {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

export function PrivateRoute({component: Component, ...rest}: Props) {
    const [authenticationState,] = useContext(StateContext);

    return (
        <Route {...rest} render={props => (
            userService.isAuthenticated(authenticationState)
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
}