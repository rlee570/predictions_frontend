import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Slider} from "@material-ui/core";

interface VoteDialogProps {
    openDialog: boolean;
    handleCancel: () => void;
    userVote: boolean;
    maxNoAvailablePoints: number;
    handleVote: (selectedPoints: number | number[]) => void;
}

export default function VoteDialog(props: VoteDialogProps) {
    const {openDialog, handleCancel, maxNoAvailablePoints, handleVote} = props;

    const [selectedPoints, setSelectedPoints] = React.useState<number | number[]>(0);

    const marks = [
        {
            value: 0,
            label: '1',
        },
        {
            value: maxNoAvailablePoints,
            label: `${maxNoAvailablePoints}`,
        },
    ];

    function valuetext(value: number) {
        return `${value} points`;
    }

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setSelectedPoints(newValue);
    };

    return (
        <div>
            <Dialog open={openDialog} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="vote-dialog-title">Vote
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Number of available points
                    </DialogContentText>
                    <Slider
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={maxNoAvailablePoints}
                        marks={marks}
                        onChange={handleSliderChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleVote(selectedPoints)} color="primary">
                        Vote
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
