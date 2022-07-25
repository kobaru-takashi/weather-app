import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { New_YorkHT, New_YorkHTAndLT, New_YorkLT, TokyoHT, TokyoHTAndLT, TokyoLT } from "../data/area-url";

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

  const onChangeArea = (url: string) => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChart(json));
  };

  // const handleChangeArea = (v: boolean) => {
  //   setArea(v);
  //   onChangeArea(v);
  // };

  useEffect(() => {
    onChangeArea(New_YorkHTAndLT);
  }, []);

  return (
    <div>
      <div id="App">{"気温"}</div>
      <div id="chartReport">
        <canvas id="myChart"></canvas>
      </div>
      <Button label="ニューヨーク最高気温＆最低気温" onClick={() => onChangeArea(New_YorkHTAndLT)} />
      <Button label="ニューヨーク最高気温" onClick={() => onChangeArea(New_YorkHT)} />
      <Button label="ニューヨーク最低気温" onClick={() => onChangeArea(New_YorkLT)} />
      <Button label="東京最高気温＆最低気温" onClick={() => onChangeArea(TokyoHTAndLT)} />
      <Button label="東京最高気温" onClick={() => onChangeArea(TokyoHT)} />
      <Button label="東京最低気温" onClick={() => onChangeArea(TokyoLT)} />
    </div>
  );
};
