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
import {ADMIN_ROLE, isAuthenticated} from "../state/user/User";
import VoteDialog from "./VoteDialog";
import OutcomeSelect from "./OutcomeSelect";
import {statisticsApi, userApi, voteApi} from "../service/Api";
import {AxiosError, AxiosResponse} from "axios";
import {StatisticsResponse, UserResponse, VoteResponse} from "../service/Response";
import {initialVoteState} from "../state/vote/Vote";
import {voteReducer} from "../state/vote/Reducer";
import {VoteActionType} from "../state/vote/Action";
import {statisticsReducer} from "../state/prediction/Reducer";
import {initialStatisticsState} from "../state/prediction/Statistics";
import {StatisticsActionType} from "../state/prediction/Action";
import CustomPieChart from "./CustomPieChart";
import {getOutcomeLabel, isExpired, notEnoughPoints, Prediction} from "../state/prediction/Prediction";
import {ERROR_STATUS} from "../state/base/BaseState";
import {UserActionType} from "../state/user/Action";

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
    updatePrediction: (predictionId: number, outcome: boolean) => void;
}

const PIE_YES_NAME: string = "Yes votes";
const PIE_NO_NAME: string = "No votes";

export default function PredictionCard(props: PredictionCardProps) {
    const classes = useStyles();
    const {prediction, updatePrediction} = props;

    const [expanded, setExpanded] = React.useState(false);
    const [openVoteDialog, setOpenVoteDialog] = React.useState(false);

    const [userVote, setUserVote] = React.useState(false);
    const [outcome, setOutcome] = React.useState<number>(0);

    const [userState, userDispatch] = useContext(StateContext);
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
        voteDispatch({type: VoteActionType.CREATE_VOTE_REQUEST});
        voteApi.createVote(prediction.id, userState.user.id, votedPoints as number, userVote, userState.token)
            .then((response: AxiosResponse<VoteResponse>) => {
                voteDispatch({type: VoteActionType.CREATE_VOTE_SUCCESS, response: response.data});
                // TODO custom hooks to async fetch user and statistics
                userDispatch({type: UserActionType.GET_USER_REQUEST});
                return userApi.getUserById(userState.user.id, userState.token)
            })
            .then((response: AxiosResponse<UserResponse>) => {
                userDispatch({type: UserActionType.GET_USER_SUCCESS, response: response.data});
                statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_REQUEST});
                return statisticsApi.getStatistics(prediction.id)
            })
            .then((response: AxiosResponse<StatisticsResponse>) => {
                statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_SUCCESS, response: response.data});
                setOpenVoteDialog(false);
            })
            .catch((error: AxiosError) => {
                voteDispatch({type: VoteActionType.CREATE_VOTE_FAILURE, errorResponse: error});
            });
    };

    const handleChangeOutcome = (event: React.ChangeEvent<{ value: unknown }>) => {
        const val = event.target.value as number;
        setOutcome(val);
        console.log("value: ", val);
        if (val === 1) {
            updatePrediction(prediction.id, true);
        }
        if (val === 2) {
            updatePrediction(prediction.id, false);
        }
    };

    useEffect(() => {
        statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_REQUEST});
        statisticsApi.getStatistics(prediction.id)
            .then((response: AxiosResponse<StatisticsResponse>) => {
                statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_SUCCESS, response: response.data});
            })
            .catch((error: AxiosError) => {
                statisticsDispatch({type: StatisticsActionType.GET_STATISTICS_FAILURE, errorResponse: error});
            });
    }, []);


    const chartData = [
        {
            name: PIE_YES_NAME, numberOfVotes: statisticsState.statistics ? statisticsState.statistics.yesVotes : 0,
        },
        {
            name: PIE_NO_NAME, numberOfVotes: statisticsState.statistics ? statisticsState.statistics.noVotes : 0,
        },
    ];

    const getSubHeaderText = () => {
        return 'Expiry Date: ' + prediction.expiry.toString() + ' ' + getOutcomeLabel(prediction);
    }

    return (
        <div>
            <Card className={classes.card}>

                {(voteState.isLoading) && <CircularProgress/>}

                <CardHeader title="Prediction" subheader={getSubHeaderText()}>
                    <Typography variant="body2" component="p">
                        {getSubHeaderText()}
                    </Typography>
                    <Typography variant="body2" component="p">
                        fsdajfajsdl;fsda
                    </Typography>
                </CardHeader>
                <CardActionArea>

                    {voteState.reason && voteState.status === ERROR_STATUS &&
                    <Typography variant="body2" color="error" component="p">
                        {voteState.reason}
                    </Typography>
                    }

                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {prediction.statement}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Tooltip title="Vote yes">
                        <IconButton color="primary"
                                    disabled={!isAuthenticated(userState) || isExpired(prediction) || notEnoughPoints(userState.user)}
                                    onClick={() => handleClickOpenVoteDialog(true)}>
                            <ThumbUpIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Vote no">
                        <IconButton color="secondary"
                                    disabled={!isAuthenticated(userState) || isExpired(prediction) || notEnoughPoints(userState.user)}
                                    onClick={() => handleClickOpenVoteDialog(false)}>
                            <ThumbDownIcon/>
                        </IconButton>
                    </Tooltip>

                    <IconButton
                        className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show vote details"
                        disabled={!statisticsState.statistics || statisticsState.statistics.totalVotes == 0}
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>

                {userState.user && userState.user.role === ADMIN_ROLE &&

                <CardActions>
                    <OutcomeSelect handleChangeOutcome={handleChangeOutcome} outcomeValue={outcome}
                                   isDisabled={prediction.outcome}/>
                </CardActions>

                }

                <VoteDialog openDialog={openVoteDialog} handleCancel={handleCancelVoteDialog} handleVote={handleVote}
                            maxNoAvailablePoints={userState.user && userState.user.points}
                            userVote={userVote}/>

                <Collapse in={expanded} timeout="auto">
                    <CardContent>
                        <CustomPieChart chartData={chartData}/>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}
