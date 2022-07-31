import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { TokyoHT, TokyoLT } from "../data/area-url";
import { Input } from "../../ui/input";

export const HighLowTemperature = () => {
  const [temperatureRadioChart, setTemperatureRadioChart] = useState<Chart | null>(null);
  const [isTemperature, setIsTemperature] = useState(true);

  const drawChartTemperatureRadio = (json: any) => {
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
    const table = "temperatureRadio";

    if (temperatureRadioChart) {
      temperatureRadioChart.destroy();
    }
    setTemperatureRadioChart(
      new Chart(table, {
        type: "line",
        data: myData,
      })
    );
  };

  const onChangeJsonData = (url: string, callback: (jsonData: string) => void) => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => callback(json));
  };

  useEffect(() => {
    onChangeJsonData(TokyoHT, drawChartTemperatureRadio);
  }, []);

  return (
    <>
      <div>最高気温＆最低気温</div>
      <div id="chartHighLowTemperature" style={{width:600, height:300}}>
        <canvas id="temperatureRadio"></canvas>
      </div>
      <Input
        id="HT"
        type="radio"
        name="temperature"
        onChange={() => {
          setIsTemperature(!isTemperature);
          onChangeJsonData(TokyoHT, drawChartTemperatureRadio);
        }}
        checked={isTemperature}
      />
      <label htmlFor="HT">最高気温</label>
      <Input
        id="LT"
        type="radio"
        name="temperature"
        onChange={() => {
          setIsTemperature(!isTemperature);
          onChangeJsonData(TokyoLT, drawChartTemperatureRadio);
        }}
        checked={!isTemperature}
      />
      <label htmlFor="LT">最低気温</label>
    </>
  );
};
