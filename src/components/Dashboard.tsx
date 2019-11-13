import React, {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {StateContext} from "../state/StateProvider";
import {StyledPaper} from "./styles/MuiStyles";
import SetupUser from "./SetupUser";

interface DashboardProps {
}

export default function Dashboard(props: DashboardProps) {
    const [userState,] = useContext(StateContext);

    return (
        <div>
            <SetupUser/>

            <StyledPaper>
                <Typography variant="h5" component="h3">
                    This will be the dashboard of user {userState.user && userState.user.email}
                </Typography>
            </StyledPaper>
            <StyledPaper>
                <Typography variant="h5" component="h3">
                    Number of available points: {userState.user && userState.user.points}
                </Typography>
            </StyledPaper>

        </div>
    );
}
