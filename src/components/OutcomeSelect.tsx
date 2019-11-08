import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {InputLabel} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            align: 'top',
        },
    }),
);

interface OutcomeSelectProps {
    handleChangeOutcome: (event: React.ChangeEvent<{ value: unknown }>) => void;
    outcomeValue: string | number;
}

export default function OutcomeSelect(props: OutcomeSelectProps) {
    const classes = useStyles();
    const {handleChangeOutcome, outcomeValue} = props;

    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="outcome-select-label">Outcome</InputLabel>
                <Select
                    id="outcome-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={outcomeValue}
                    onChange={handleChangeOutcome}
                >
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={2}>No</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
