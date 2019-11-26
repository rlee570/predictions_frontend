import {useTheme} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";

interface CustomPieChartProps {
    chartData: Array<object>;
}

export default function CustomPieChart(props: CustomPieChartProps) {
    const theme = useTheme();
    const colors = [theme.palette.primary.main, theme.palette.secondary.main];
    const {chartData} = props;

    return (
        <div>
            <Typography variant="body2" color="textPrimary">
                Existing votes
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart width={150} height={150}>
                    <Pie data={chartData} cx="50%" cy="50%" label dataKey="numberOfVotes">
                        {
                            chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}