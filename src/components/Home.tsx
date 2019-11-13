import React, {useContext, useEffect, useReducer} from 'react';
import {CircularProgress, Grid, makeStyles, Theme} from "@material-ui/core";
import {predictionApi} from "../service/Api";
import {AxiosError, AxiosResponse} from "axios";
import {initialPredictionsState} from "../state/prediction/Prediction";
import {predictionsReducer} from "../state/prediction/Reducer";
import {PredictionActionType} from "../state/prediction/Action";
import PredictionCard from "./PredictionCard";
import {PredictionsResponse} from "../service/Response";
import {StateContext} from "../state/StateProvider";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey['100'],
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        paddingBottom: 200
    },
    grid: {
        width: 1200,
        marginTop: 40,
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 20px)'
        }
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    rangeLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2)
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32
    },
    outlinedButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1)
    },
    actionButtom: {
        textTransform: 'uppercase',
        margin: theme.spacing(1),
        width: 152
    },
    blockCenter: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    block: {
        padding: theme.spacing(2),
    },
    box: {
        marginBottom: 40,
        height: 65
    },
    inlining: {
        display: 'inline-block',
        marginRight: 10
    },
    buttonBar: {
        display: 'flex'
    },
    alignRight: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    noBorder: {
        borderBottomStyle: 'hidden'
    },
    loadingState: {
        opacity: 0.05
    },
    loadingMessage: {
        position: 'absolute',
        top: '40%',
        left: '40%'
    },
}))

interface HomeProps {
}

export default function Home(props: HomeProps) {
    const classes = useStyles();

    const [predictionsState, dispatch] = useReducer(predictionsReducer, initialPredictionsState());
    const [userState,] = useContext(StateContext);

    useEffect(() => {
        dispatch({type: PredictionActionType.GET_ALL_PREDICTIONS_REQUEST});
        predictionApi.getAllPredictions()
            .then((response: AxiosResponse<PredictionsResponse>) => {
                dispatch({type: PredictionActionType.GET_ALL_PREDICTIONS_SUCCESS, response: response.data});
            })
            .catch((error: AxiosError) => {
                console.log('Error fetching all predictions: ', error);
                dispatch({type: PredictionActionType.GET_ALL_PREDICTIONS_FAILURE, errorResponse: error});
            });
    }, []);

    const updatePrediction = (predictionId: number, outcome: boolean) => {
        // TODO call update prediction endpoint
    };

    return (
        <div>
            <Grid container justify="center">
                <Grid spacing={4} alignItems="center" justify="center" container className={classes.grid} >

                    {predictionsState.isLoading && <CircularProgress/>}

                    {predictionsState.predictions && predictionsState.predictions.map(prediction => (
                        <Grid item xs={12} md={4} id={prediction.id.toString()}>
                            <PredictionCard prediction={prediction} updatePrediction={updatePrediction}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}

