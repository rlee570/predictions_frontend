import React, {useContext, useEffect} from "react";
import {StateContext} from "../state/StateProvider";
import {UserActionType} from "../state/user/Action";
import {userApi} from "../service/Api";
import {AxiosError, AxiosResponse} from "axios";
import {CreateUserResponse} from "../service/Response";
import {CircularProgress, Container, CssBaseline} from "@material-ui/core";

interface SetupUserProps  {
}

export default function SetupUser(props: SetupUserProps) {

    const [userState, dispatch] = useContext(StateContext);

    useEffect(() => {

        if (!userState.user || !userState.token) {
            return;
        }

        dispatch({type: UserActionType.GET_USER_REQUEST});
        userApi.getUserById(userState.user.id, userState.token)
            .then((response: AxiosResponse<CreateUserResponse>) => {
                dispatch({type: UserActionType.GET_USER_SUCCESS, response: response.data});
            })
            .catch((error: AxiosError) => {
                console.log('Error setting up the user', error);
                dispatch({type: UserActionType.GET_USER_FAILURE, errorResponse: error});
            });

    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            {userState.isLoading && <CircularProgress/>}
        </Container>
    );
}