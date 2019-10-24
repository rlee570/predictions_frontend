import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CommonStyles from "./styles/CommonStyles";
import {withStyles, WithStyles} from "@material-ui/core";

interface HomeProps extends WithStyles<typeof CommonStyles> {
}

function Home(props: HomeProps) {
    const {classes} = props;

    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                    This is public content showing all available predictions.
                </Typography>
            </Paper>
        </div>
    );
}

export default withStyles(CommonStyles)(Home);

