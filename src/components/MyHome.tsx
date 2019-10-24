import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {StateContext} from "../state/StateProvider";
import {StyledPaper} from "./styles/HomeStyles";

interface MyHomeProps {
}

export default function MyHome(props: MyHomeProps) {
    const [authenticationState,] = useContext(StateContext);

    return (
        <div>
            <StyledPaper>
                <Typography variant="h5" component="h3">
                    This is specific (private) content of user {authenticationState.user && authenticationState.user.email}
                </Typography>
            </StyledPaper>
        </div>
    );
}
