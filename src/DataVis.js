// DataVis.js
import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryBoxPlot, VictoryContainer,
  VictoryBar,
} from "victory";
// import Papa from "papaparse";
// import { useEffect, useState } from "react";
import VisualizationType from "./VisualizationType";

const idealUpperBound = 90;
const idealLowerBound = 70; //props
const currentValue = 80;
const mainLineData = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
];
const formatTime = (tick) => {
  const date = new Date(tick * 1000); // Convert UNIX timestamp to JavaScript Date
  // Use toLocaleTimeString or manually format the hours, minutes, and seconds
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set to true if you prefer AM/PM format
  });
};
const markerData = [
  { x: 0, y: 0, label: `0`, labelPosition: "left" },
  { x: 100, y: 0, label: `100`, labelPosition: "right" },
  {
    x: currentValue,
    y: 0,
    label: `Curr: ${currentValue}`,
    labelPosition: "bottom",
  },
  {
    x: idealLowerBound,
    y: 0,
    label: `LB: ${idealLowerBound}`,
    labelPosition: "top",
  },
  {
    x: idealUpperBound,
    y: 0,
    label: `UB: ${idealUpperBound}`,
    labelPosition: "top",
  },
];

const DataVis = ({ type, data, temp, moisture, water_level, light }) => {
  // Data: list of unique
  switch (type) {
    case VisualizationType.Line:
      return (
        <div className="DataVis">
          <VictoryChart domainPadding={20} animate={{ duration: 2000 }}>
            <VictoryBoxPlot
              boxWidth={20}
              data={[
                { x: "Temperature", min: 0, max: 100, q1: 10, median: temp, q3: 30 },
                { x: "Moisture", min: 0, max: 100, q1: 30, median: moisture, q3: 100 },
                { x: "Water Level", min: 0, max: 100, q1: 0, median: water_level, q3: 100 },
                { x: "Light Intensity", min: 0, max: 100, q1: 30, median: light, q3: 100 },
              ]}
              style={{
                q1: { fill: "tomato" }, // Change the color of the first quartile box
                q3: { fill: "orange" }, // Change the color of the third quartile box
                median: { stroke: "green" }, // Change the color of the median line
                // For dynamic coloring based on the data, use a function
                boxes: {
                  fill: (d) => {
                    // You can adjust the return value to change colors based on the data point
                    const colors = [
                      "#4fc3f7",
                      "#aed581",
                      "#fff176",
                      "#ffb74d",
                    ];
                    return colors[d.index % colors.length];
                  },
                },
              }}
            />
          </VictoryChart>
        </div>
      );
    case VisualizationType.Bar:
      return (
        <VictoryChart
          theme={VictoryTheme.material}
          animate={{ duration: 2000 }}
          domainPadding={{ y: [10, 30] }}
          domain={{ y: [data.length > 0 ? Math.min(...data.map(d => d.temperature)) : 0, data.length > 0 ? Math.max(...data.map(d => d.temperature)) : 0] }}
        >
          <VictoryArea
            data={data.map((d) => ({
              x: d.timestamp,
              y: d.temperature,
            }))}

            style={{ data: { fill: "#966fd6" } }}
          />
          <VictoryAxis
            tickValues={data.map((d) => d.timestamp).filter((_, index) => index % 60 === 0)}
            tickFormat={(tick) => formatTime(tick)}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fill: "#667fc4", fontSize: 12, padding: 5 },
              grid: { stroke: "#ddd", strokeDasharray: "4, 8" },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${tick}°`}
            label="Temperature (C)"
            style={{
              axisLabel: { padding: 35, fill: "#667fc4", fontSize: 14, fontStyle: "italic" },
              ticks: { stroke: "#667fc4", size: 5 },
              tickLabels: { fill: "#667fc4", fontSize: 12, padding: 5 },
              grid: { stroke: "#ddd", strokeDasharray: "4, 8" },
            }}
          />
        </VictoryChart>
      );
    case VisualizationType.Bar2:
      return (
        <VictoryChart
          theme={VictoryTheme.material}
          animate={{ duration: 2000 }}
          domainPadding={{ y: [10, 30] }}
          domain={{y: [data.length > 0 ? Math.min(...data.map(d => d.water_level)) : 0, data.length > 0 ? Math.max(...data.map(d => d.water_level)) : 0] }}
        >
          <VictoryArea
            data={data.map((d) => ({
              x: d.timestamp,
              y: d.water_level,
            }))}
            style={{ data: { fill: "#4fc3f7" } }}
          />
          <VictoryAxis
            tickValues={data.map((d) => d.timestamp).filter((_, index) => index % 60 === 0)}
            tickFormat={(tick) => formatTime(tick)}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fill: "#667fc4", fontSize: 12, padding: 5 },
              grid: { stroke: "#ddd", strokeDasharray: "4, 8" },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${tick}°`}
            label="Water Level (%)"
            style={{
              axisLabel: { padding: 35, fill: "#667fc4", fontSize: 14, fontStyle: "italic" },
              ticks: { stroke: "#667fc4", size: 5 },
              tickLabels: { fill: "#667fc4", fontSize: 12, padding: 5 },
              grid: { stroke: "#ddd", strokeDasharray: "4, 8" },
            }}
          />
        </VictoryChart>
      );
    case VisualizationType.Bar3:
      const ymin=Math.max(Math.min(...data.map(d => d.light))-8,0);
      const ymax=Math.min(Math.max(...data.map(d => d.light))+8,100);
      return (
        <VictoryChart
          theme={VictoryTheme.material}
          animate={{ duration: 2000 }}
          domainPadding={{ y: [10, 30] }}
          domain={{ y: [data.length > 0 ? ymin : 0, data.length > 0 ? ymax : 0] }}
        >
          <VictoryArea
            data={data.map((d) => ({
              x: d.timestamp,
              y: d.light,
            }))}
            style={{ data: { fill: "#56AE57" } }}
          />
          <VictoryAxis
            tickValues={data.map((d) => d.timestamp).filter((_, index) => index % 60 === 0)}
            tickFormat={(tick) => formatTime(tick)}
            fixLabelOverlap={true}
            style={{
              tickLabels: { fill: "#667fc4", fontSize: 12, padding: 5 },
              grid: { stroke: "#ddd", strokeDasharray: "4, 8" },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${tick}°`}
            label="Light Intensity (%)"
            style={{
              axisLabel: { padding: 35, fill: "#667fc4", fontSize: 14, fontStyle: "italic" },
              ticks: { stroke: "#667fc4", size: 5 },
              tickLabels: { fill: "#667fc4", fontSize: 12, padding: 5 },
              grid: { stroke: "#ddd", strokeDasharray: "4, 8" },
            }}
          />
        </VictoryChart>
      );
    default:
      return <div>Unsupported visualization type</div>;
  }
};

export default DataVis;
