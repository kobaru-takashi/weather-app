import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { AREA_URL } from "../../../data/area-url";
import { Sidebar } from "../sidebar/sidebar";

export const Temperature = () => {
  const [temperatureChart, setTemperatureChart] = useState<Chart | null>(null);
  const [disabledList, setDisabledList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [disableIndex, setDisabledIndex] = useState(0);

  const drawChartTemperature = (json: any) => {
    const myData = {
      labels: json.daily.time,
      datasets: [
        {
          label: "最高気温",
          data: json.daily.temperature_2m_max,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "最低気温",
          data: json.daily.temperature_2m_min,
          borderColor: "rgb(75, 75, 192)",
        },
      ],
    };
    const table = "temperature";

    if (temperatureChart) {
      temperatureChart.destroy();
    }
    setTemperatureChart(
      new Chart(table, {
        type: "line",
        data: myData,
      })
    );
  };

  const onChangeJsonData = (
    url: string,
    callback: (jsonData: string) => void
  ) => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => callback(json));
  };

  const changeIndex = useCallback((v: number) => {
    setDisabledIndex(v);
  },[disableIndex, disabledList]);

  useEffect(() => {
    setDisabledList(disabledList.map((disabled, i) => disabled = i === disableIndex ? true : false));
  },[disableIndex]);

  useEffect(() => {
    onChangeJsonData(AREA_URL.New_YorkHTAndLT, drawChartTemperature);
  }, []);

  return (
    <>
      <Sidebar/>
      <h1> --- 気温 ---</h1>
      <div id="chartTemperature" style={{ width: 600, height: 300 }}>
        <canvas id="temperature"></canvas>
      </div>
      <Button
        label="ニューヨーク最高気温＆最低気温"
        onClick={()=>{
          onChangeJsonData(AREA_URL.New_YorkHTAndLT, drawChartTemperature);
          changeIndex(0);
        }}
        disabled={disabledList[0]}
      />
      <Button
        label="ニューヨーク最高気温"
        onClick={()=>{
          onChangeJsonData(AREA_URL.New_YorkHT, drawChartTemperature);
          changeIndex(1);
        }}
        disabled={disabledList[1]}
      />
      <Button
        label="ニューヨーク最低気温"
        onClick={()=>{
          onChangeJsonData(AREA_URL.New_YorkLT, drawChartTemperature);
          changeIndex(2);
        }}
        disabled={disabledList[2]}
      />
      <Button
        label="東京最高気温＆最低気温"
        onClick={()=>{
          onChangeJsonData(AREA_URL.TokyoHTAndLT, drawChartTemperature);
          changeIndex(3);
        }}
        disabled={disabledList[3]}
      />
      <Button
        label="東京最高気温"
        onClick={()=>{
          onChangeJsonData(AREA_URL.TokyoHT, drawChartTemperature);
          changeIndex(4);
        }}
        disabled={disabledList[4]}
      />
      <Button
        label="東京最低気温"
        onClick={()=>{
          onChangeJsonData(AREA_URL.TokyoLT, drawChartTemperature);
          changeIndex(5);
        }}
        disabled={disabledList[5]}
      />
    </>
  );
};
