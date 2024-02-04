
// DataVis.js
import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel, VictoryBoxPlot, VictoryBar} from 'victory';
// import Papa from "papaparse";
// import { useEffect, useState } from "react";
import VisualizationType from './VisualizationType';



const idealUpperBound = 90;
const idealLowerBound = 70; //props
const currentValue = 80;
const mainLineData = [
    { x: 0, y: 0 },
    { x: 100, y: 0 }
];

const markerData = [
    { x: 0, y: 0, label: `0`, labelPosition: 'left' },
    { x: 100, y: 0, label: `100`, labelPosition: 'right' },
    { x: currentValue, y: 0, label: `Curr: ${currentValue}`, labelPosition: 'bottom' },
    { x: idealLowerBound, y: 0, label: `LB: ${idealLowerBound}`, labelPosition: 'top' },
    { x: idealUpperBound, y: 0, label: `UB: ${idealUpperBound}`, labelPosition: 'top' }
];

const DataVis = ({ type, data }) => { // Data: list of unique 
    switch (type) {
        case VisualizationType.Line:
            return (<div className="DataVis">
                <VictoryChart domainPadding={20} animate={{ duration: 2000 }}>
                    <VictoryBoxPlot
                        boxWidth={20}
                        data={[
                            { x: "Hydration", min: 0, max: 100, q1: 30, median: 80, q3: 70 }, //TODO UPDATE BOUNDS, current value???
                            { x: "Lol", min: 0, max: 100, q1: 30, median: 20, q3: 70 },
                            { x: "Amongus", min: 0, max: 100, q1: 30, median: 50, q3: 70 },
                            { x: "Lmao", min: 0, max: 100, q1: 30, median: 50, q3: 70 },
                            { x: "Coolsies", min: 0, max: 100, q1: 30, median: 50, q3: 70 }
                        ]}
                        style={{
                            q1: { fill: "tomato" }, // Change the color of the first quartile box
                            q3: { fill: "orange" }, // Change the color of the third quartile box
                            median: { stroke: "green" }, // Change the color of the median line
                            // For dynamic coloring based on the data, use a function
                            boxes: {
                                fill: (d) => {
                                    // You can adjust the return value to change colors based on the data point
                                    const colors = ["#4fc3f7", "#aed581", "#fff176", "#ffb74d", "#e57373"];
                                    return colors[d.index % colors.length];
                                }
                            }
                        }}
                    />
                </VictoryChart>
            </div>);
        case VisualizationType.Bar:
            return <VictoryBar data={data} />;
        default:
            return <div>Unsupported visualization type</div>;
    }
};

export default DataVis;









