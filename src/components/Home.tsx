import React from 'react';
import Typography from '@material-ui/core/Typography';
import {StyledPaper} from "./styles/HomeStyles";


interface HomeProps {
}

export default function Home(props: HomeProps) {
    const {} = props;

    return (
        <div>
            <StyledPaper>
                <Typography variant="h5" component="h3">
                    This is public content showing all available predictions.
                </Typography>
            </StyledPaper>
        </div>
    );
}

