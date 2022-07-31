import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import {
  New_YorkHT,
  New_YorkHTAndLT,
  New_YorkLT,
  TokyoHT,
  TokyoHTAndLT,
  TokyoLT,
} from "../data/area-url";

export const Temperature = () => {
  const [temperatureChart, setTemperatureChart] = useState<Chart | null>(null);

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

  useEffect(() => {
    onChangeJsonData(New_YorkHTAndLT, drawChartTemperature);
  }, []);

  return (
    <>
      <div>気温</div>
      <div id="chartTemperature" style={{ width: 600, height: 300 }}>
        <canvas id="temperature"></canvas>
      </div>
      <Button
        label="ニューヨーク最高気温＆最低気温"
        onClick={() => onChangeJsonData(New_YorkHTAndLT, drawChartTemperature)}
      />
      <Button
        label="ニューヨーク最高気温"
        onClick={() => onChangeJsonData(New_YorkHT, drawChartTemperature)}
      />
      <Button
        label="ニューヨーク最低気温"
        onClick={() => onChangeJsonData(New_YorkLT, drawChartTemperature)}
      />
      <Button
        label="東京最高気温＆最低気温"
        onClick={() => onChangeJsonData(TokyoHTAndLT, drawChartTemperature)}
      />
      <Button
        label="東京最高気温"
        onClick={() => onChangeJsonData(TokyoHT, drawChartTemperature)}
      />
      <Button
        label="東京最低気温"
        onClick={() => onChangeJsonData(TokyoLT, drawChartTemperature)}
      />
    </>
  );
};
