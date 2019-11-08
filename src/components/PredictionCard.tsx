import React, {useContext, useEffect, useReducer} from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Collapse,
    makeStyles,
    Theme,
    Tooltip
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {StateContext} from "../state/StateProvider";
import {isAuthenticated} from "../state/user/User";
import VoteDialog from "./VoteDialog";
import OutcomeSelect from "./OutcomeSelect";
import {statisticsApi, voteApi} from "../service/Api";
import {AxiosError, AxiosResponse} from "axios";
import {StatisticsResponse, VoteResponse} from "../service/Response";
import {initialVoteState} from "../state/vote/Vote";
import {voteReducer} from "../state/vote/Reducer";
import {VoteActionType} from "../state/vote/Action";
import CustomSnackbar from "./CustomSnackbar";
import {statisticsReducer} from "../state/prediction/Reducer";
import {initialStatisticsState} from "../state/prediction/Statistics";
import {StatisticsActionType} from "../state/prediction/Action";
import CustomPieChart from "./CustomPieChart";
import {getOutcomeLabel, isExpired, Prediction} from "../state/prediction/Prediction";
import util from "util";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        paddingBottom: 200
    },
    card: {
        maxWidth: 345,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}))

interface PredictionCardProps {
    prediction: Prediction;
}

export default function PredictionCard(props: PredictionCardProps) {
    const classes = useStyles();
    const {prediction} = props;

    const [expanded, setExpanded] = React.useState(false);
    const [openVoteDialog, setOpenVoteDialog] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [userVote, setUserVote] = React.useState(false);
    const [outcome, setOutcome] = React.useState<string | number>(0);

    const [userState,] = useContext(StateContext);
    const [voteState, voteDispatch] = useReducer(voteReducer, initialVoteState());
    const [statisticsState, statisticsDispatch] = useReducer(statisticsReducer, initialStatisticsState());

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOpenVoteDialog = (userVote: boolean) => {
        setUserVote(userVote);
        setOpenVoteDialog(true);
    };

    const handleCancelVoteDialog = () => {
        setOpenVoteDialog(false);
    };

    const handleVote = (votedPoints: number | number[]) => {
        console.log("Voted points: ", votedPoints);

        voteDispatch({type: VoteActionType.CREATE_VOTE_REQUEST});
        voteApi.createVote(prediction.id, userState.user.id, votedPoints as number, userVote)
            .then((response: AxiosResponse<VoteResponse>) => {
                voteDispatch({type: VoteActionType.CREATE_VOTE_SUCCESS, response: response.data});
                setOpenVoteDialog(false);
                // TODO on success we also need to update the no available points for the user!
            })
            .catch((error: AxiosError) => {
                voteDispatch({type: VoteActionType.CREATE_VOTE_FAILURE, errorResponse: error});
                setOpenSnackbar(true);
            });
    };

    const handleChangeOutcome = (event: React.ChangeEvent<{ value: unknown }>) => {
        setOutcome(event.target.value as number);
        console.log("outcome: ", outcome);
    };

    useEffect(() => {
        statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_REQUEST});
        statisticsApi.getStatistics(prediction.id)
            .then((response: AxiosResponse<StatisticsResponse>) => {
                statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_SUCCESS, response: response.data});
            })
            .catch((error: AxiosError) => {
                console.log('Error fetching statistics: ', error);
                statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_FAILURE, errorResponse: error});
            });
    }, []);

    const chartData = [
        {
            name: 'Yes votes', numberOfVotes: statisticsState.statistics ? statisticsState.statistics.yesVotes : 0,
        },
        {
            name: 'No votes', numberOfVotes: statisticsState.statistics ? statisticsState.statistics.noVotes : 0,
        },
    ];

    const getSubHeaderText = () => {
        const ed: string = 'Expiry Date: ' + prediction.expiry.toString() + ' ' + getOutcomeLabel(prediction);
        console.log("newState after login success: " + util.inspect(prediction, false, null, true));
        return ed;
    }

    return (
        <div>
            <Card className={classes.card}>

                {(voteState.isLoading || statisticsState.isLoading) && <CircularProgress/>}

                <CardHeader title="Prediction" subheader={getSubHeaderText()}/>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {prediction.statement}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Tooltip title="Vote yes">
                        <IconButton color="primary" disabled={!isAuthenticated(userState) || isExpired(prediction)}
                                    onClick={() => handleClickOpenVoteDialog(true)}>
                            <ThumbUpIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Vote no">
                        <IconButton color="secondary" disabled={!isAuthenticated(userState) || isExpired(prediction)}
                                    onClick={() => handleClickOpenVoteDialog(false)}>
                            <ThumbDownIcon/>
                        </IconButton>
                    </Tooltip>

                    <IconButton
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show vote details"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <CardActions>
                    <OutcomeSelect handleChangeOutcome={handleChangeOutcome} outcomeValue={outcome}/>
                </CardActions>

                <VoteDialog openDialog={openVoteDialog} handleCancel={handleCancelVoteDialog} handleVote={handleVote}
                            maxNoAvailablePoints={userState.user && userState.user.points}
                            userVote={userVote}/>

                <CustomSnackbar snackbarMessage={voteState.error} openBar={openSnackbar}
                                onClose={() => setOpenSnackbar(false)}
                                variant={voteState.error ? 'error' : 'success'}/>


                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CustomPieChart chartData={chartData}/>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
