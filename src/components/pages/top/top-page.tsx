import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";

export const TopPage = () => {
  const [area, setArea] = useState(false);
  const [myChart, setMyChart] = useState<Chart | null>(null);

  const drawChart = (json: any) => {
    const mydata = {
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
    const table = "myChart";

    if (myChart) {
      myChart.destroy();
    }
    setMyChart(
      new Chart(table, {
        type: "line",
        data: mydata,
      })
    );
  };

  const onChangeArea = (v: boolean) => {
    const Tokyo =
      "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo";
    const New_York =
      "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York";

    const area = v ? Tokyo : New_York;

    fetch(area)
      .then((data) => data.json())
      .then((json) => drawChart(json));
  };

  const handleChangeArea = (v: boolean) => {
    setArea(v);
    onChangeArea(v);
  };

  useEffect(() => {
    onChangeArea(!area);
  }, []);

  return (
    <div>
      <div id="App">{area ? "東京の天気" : "ニューヨークの天気"}</div>
      <div id="chartReport">
        <canvas id="myChart"></canvas>
      </div>
      <button type="button" onClick={() => handleChangeArea(!area)} id="btn">
        グラフを更新
      </button>
    </div>
  );
};
