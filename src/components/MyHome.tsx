import React, {useContext} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles, WithStyles} from "@material-ui/core";
import CommonStyles from "./styles/CommonStyles";
import {StateContext} from "../state/StateProvider";

interface MyHomeProps extends WithStyles<typeof CommonStyles> {
}

function MyHome(props: MyHomeProps) {
    const {classes} = props;
    const [authenticationState,] = useContext(StateContext);

    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                    This is specific (private) content of user {authenticationState.user && authenticationState.user.email}
                </Typography>
            </Paper>
        </div>
    );
}

export default withStyles(CommonStyles)(MyHome);