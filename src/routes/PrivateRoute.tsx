import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {StateContext} from "../state/StateProvider";
import {isAuthenticated} from "../state/user/User";

interface Props {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

export function PrivateRoute({component: Component, ...rest}: Props) {
    const [userState,] = useContext(StateContext);

    return (
        <Route {...rest} render={props => (
            isAuthenticated(userState)
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
}