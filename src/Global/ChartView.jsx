import React, { useState, useEffect } from "react";
import {
  FlexibleXYPlot,
  LineSeries,
  YAxis,
  XAxis,
  HorizontalGridLines,
  AreaSeries,
  Crosshair,
} from "react-vis";
import AppHeader from "../Global/AppHeader";
import InfoContainer from "../Global/InfoContainer";
import dataFile from "../data.json";
import { WbSunny } from "@material-ui/icons";

const ChartView = ({ showHeader, toggleCompare, compare }) => {
  const renderColors = {
    chart1: { in: "#496699", out: "#006380" },
    chart2: "#F9F871",
    chart3: "red",
  };

  const makeObj = (count) => {
    let dataPoints = [];
    let y = Math.floor(Math.random() * 5000);
    let hrc = 0;
    const wt = 3;
    for (var i = 0; i <= count * 2; i += 1) {
      y = Math.sin(i) * 0.05 * Math.random() * 5000 + 2000;

      dataPoints.push({
        x: hrc,
        y: Math.floor(y),
      });
      hrc += 0.5;
    }
    return dataPoints;
  };

  const [data, setData] = useState(makeObj(24));
  const [data2, setData2] = useState(makeObj(24));
  const [data3, setData3] = useState(makeObj(24));

  const [showInfo, setShowInfo] = useState(0);
  const [yValue, setyValue] = useState(data[0].y);
  const [secYValue, setSecYValue] = useState(data2[0].y);
  const [showIndicator, setShowIndicator] = useState(false);
  const [thirdYValue, setThirdYValue] = useState(data3[0].y);
  const [maxMinValue, setMaxMinValue] = useState({ min: 0, max: 6000 });
  const [chartStats, setChartStats] = useState([true, true, true]);
  const [chartView, setChartView] = useState([true, true, true]);

  const findMaxInObjectArray = (data, method) => {
    if (method === "max")
      return data.reduce((max, obj) => (max.y > obj.y ? max : obj));

    return data.reduce((min, obj) => (min.y < obj.y ? min : obj));
  };

  useEffect(() => {
    setMaxMinValue({
      min: findMaxInObjectArray(data, "min").y,
      max: findMaxInObjectArray(data, "max").y,
    });
  }, [data]);

  const findMaxValue = () => {
    const res = findMaxInObjectArray(data, "max");
    const max = maxMinValue.max;
    const max2 = findMaxInObjectArray(data2, "max").y;
    const max3 = findMaxInObjectArray(data3, "max").y;

    setShowInfo(res.x);

    setyValue(max);
    setSecYValue(max2);
    setThirdYValue(max3);
    setShowIndicator(true);
  };

  const changeDataFromDateSelection = () => {
    setData(makeObj(24));
    setData2(makeObj(24));
    setData3(makeObj(24));
  };

  const findMinValue = () => {
    const res = findMaxInObjectArray(data, "min");
    const min = maxMinValue.min;
    const min2 = findMaxInObjectArray(data2, "min").y;
    const min3 = findMaxInObjectArray(data3, "min").y;

    setShowInfo(res.x);

    setyValue(min);
    setSecYValue(min2);
    setThirdYValue(min3);
    setShowIndicator(true);
  };
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div className="mainAppHeader">
        <AppHeader
          findMaxValue={findMaxValue}
          findMinValue={findMinValue}
          changeDataFromDateSelection={changeDataFromDateSelection}
          showHeaderTitle={showHeader}
          toggleCompare={toggleCompare}
        />
      </div>
      <div className="chartInfoContainer">
        <InfoContainer
          color={renderColors.chart1.in}
          info="Consommation réalisée"
          value={yValue}
          setChartStats={setChartStats}
          index={0}
        />
        <InfoContainer
          color={renderColors.chart2}
          info="Prévision J-1"
          value={secYValue}
          setChartStats={setChartStats}
          chartView={chartView}
          setChartView={setChartView}
          index={1}
        />
        <InfoContainer
          color={renderColors.chart3}
          info="Prévision J"
          value={thirdYValue}
          setChartStats={setChartStats}
          chartView={chartView}
          setChartView={setChartView}
          index={2}
        />
        <div className="chartStatInfoC">
          <WbSunny style={{ color: "yellow" }} />
          <p>26 °C</p>
        </div>
      </div>

      <FlexibleXYPlot
        height={500}
        xDomain={[0, 24]}
        yDomain={[0, 6000]}
        margin={50}
        onMouseEnter={() => {
          setShowIndicator(true);
        }}
        onMouseLeave={() => {
          setShowIndicator(false);
        }}
      >
        <HorizontalGridLines style={{ opacity: 0.3 }} />
        <XAxis
          tickTotal={15}
          tickFormat={(v) =>
            v === 0 || v === 24
              ? ""
              : `${v.toString().length === 1 ? "0" + v : v}:00 H`
          }
          style={{
            line: { stroke: "none" },
            ticks: { stroke: "none" },
            text: {
              stroke: "none",
              fill: "#a8a8ba",
              fontWeight: 500,
              opacity: 0.8,
              fontSize: 14,
            },
          }}
        />
        <YAxis
          left={90}
          top={35}
          tickTotal={10}
          tickFormat={(v) => `${v} MW`}
          style={{
            line: { stroke: "none" },
            ticks: { stroke: "none" },
            text: {
              stroke: "none",
              fill: "#a8a8ba",
              opacity: 0.8,
              fontWeight: 500,
              fontSize: 13,
            },
          }}
        />
        {showIndicator && (
          <Crosshair
            values={[{ x: showInfo }]}
            style={{
              line: {
                width: 5,
                backgroundColor: "#59ff40",
              },
            }}
          >
            <div className="chartViewIndicator">
              <h1 style={{ margin: 5 }}>{`${
                Math.floor(showInfo).toString().length === 1
                  ? "0" + Math.floor(showInfo)
                  : Math.floor(showInfo)
              }:00`}</h1>
            </div>
          </Crosshair>
        )}

        <AreaSeries
          data={data}
          opacity={chartStats[0] ? 0.6 : 0.05}
          fill={renderColors.chart1.in}
          stroke={renderColors.chart1.out}
          animation={{ stiffness: 150 }}
          onNearestX={(datapoint, event) => {
            setShowInfo(datapoint.x);
            setyValue(datapoint.y);
          }}
        />

        {chartView[1] && (
          <LineSeries
            data={data2}
            strokeWidth={"2.5px"}
            color={renderColors.chart2}
            animation={{ stiffness: 150 }}
            onNearestX={(datapoint, event) => {
              setSecYValue(datapoint.y);
            }}
            opacity={chartStats[1] ? 0.8 : 0.05}
          />
        )}
        {chartView[2] && (
          <LineSeries
            data={data3}
            strokeWidth={"2.5px"}
            color={renderColors.chart3}
            animation={{ stiffness: 150 }}
            onNearestX={(datapoint, event) => {
              setThirdYValue(datapoint.y);
            }}
            opacity={chartStats[2] ? 0.8 : 0.05}
          />
        )}
        <LineSeries
          data={[
            { x: 0, y: maxMinValue.min },
            { x: 24, y: maxMinValue.min },
          ]}
          strokeWidth={"3px"}
          color={"#838485"}
          opacity={0.8}
        />
        <LineSeries
          data={[
            { x: 0, y: maxMinValue.max },
            { x: 24, y: maxMinValue.max },
          ]}
          strokeWidth={"3px"}
          color={"#838485"}
          opacity={0.8}
        />
      </FlexibleXYPlot>
    </div>
  );
};

export default ChartView;
