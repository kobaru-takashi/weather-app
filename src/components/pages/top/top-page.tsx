import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import {
  New_YorkHT,
  New_YorkHTAndLT,
  New_YorkLT,
  New_YorkP,
  TokyoHG,
  TokyoHT,
  TokyoHTAndLT,
  TokyoHWV,
  TokyoHWVAndHG,
  TokyoLT,
  TokyoP,
} from "../data/area-url";

export const TopPage = () => {
  const [temperatureChart, setTemperatureChart] = useState<Chart | null>(null);
  const [windVelocityChart, setWindVelocityChart] = useState<Chart | null>(null);
  const [precipitationChart, setPrecipitationChart] = useState<Chart | null>(null);

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

  const drawChartWindVelocity = (json: any) => {
    const myData = {
      labels: json.daily.time,
      datasets: [
        {
          label: "最高風速",
          data: json.daily.windspeed_10m_max,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "最高突風",
          data: json.daily.windgusts_10m_max,
          borderColor: "rgb(75, 75, 192)",
        },
      ],
    };
    const table = "windVelocity";

    if (windVelocityChart) {
      windVelocityChart.destroy();
    }
    setWindVelocityChart(
      new Chart(table, {
        type: "line",
        data: myData,
      })
    );
  };


  const drawChartPrecipitation = (json: any) => {
    const myData = {
      labels: json.daily.time,
      datasets: [
        {
          label: "降水量の合計",
          data: json.daily.precipitation_sum,
          borderColor: "rgb(75, 75, 192)",
        },
      ],
    };
    const table = "precipitation";

    if (precipitationChart) {
      precipitationChart.destroy();
    }
    setPrecipitationChart(
      new Chart(table, {
        type: "line",
        data: myData,
      })
    );
  };

  const onChangeTemperatureArea = (url: string) => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChartTemperature(json));
  };
  const onChangeWindVelocityArea = (url: string) => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChartWindVelocity(json));
  };
  const onChangePrecipitationArea = (url: string) => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChartPrecipitation(json));
  };

  useEffect(() => {
    onChangeTemperatureArea(New_YorkHTAndLT);
    onChangeWindVelocityArea(TokyoHWVAndHG);
    onChangePrecipitationArea(New_YorkP);
  }, []);

  return (
    <div>
      <div>気温</div>
      <div id="chartReport">
        <canvas id="temperature"></canvas>
      </div>
      <Button
        label="ニューヨーク最高気温＆最低気温"
        onClick={() => onChangeTemperatureArea(New_YorkHTAndLT)}
      />
      <Button
        label="ニューヨーク最高気温"
        onClick={() => onChangeTemperatureArea(New_YorkHT)}
      />
      <Button
        label="ニューヨーク最低気温"
        onClick={() => onChangeTemperatureArea(New_YorkLT)}
      />
      <Button
        label="東京最高気温＆最低気温"
        onClick={() => onChangeTemperatureArea(TokyoHTAndLT)}
      />
      <Button label="東京最高気温" onClick={() => onChangeTemperatureArea(TokyoHT)} />
      <Button label="東京最低気温" onClick={() => onChangeTemperatureArea(TokyoLT)} />

      <div>風速</div>
      <div id="chartReport">
        <canvas id="windVelocity"></canvas>
      </div>
      <Button
        label="東京最高風速＆突風"
        onClick={() => onChangeWindVelocityArea(TokyoHWVAndHG)}
      />
      <Button label="東京最高風速" onClick={() => onChangeWindVelocityArea(TokyoHWV)} />
      <Button label="東京最低突風" onClick={() => onChangeWindVelocityArea(TokyoHG)} />

      <div>降水量の合計</div>
      <div id="chartReport">
        <canvas id="precipitation"></canvas>
      </div>
      <Button label="ニューヨーク降水量" onClick={() => onChangePrecipitationArea(New_YorkP)} />
      <Button label="東京降水量" onClick={() => onChangePrecipitationArea(TokyoP)} />
    </div>
  );
};
