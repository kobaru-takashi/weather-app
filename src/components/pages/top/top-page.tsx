import React, { useState, useCallback, useEffect } from "react";
import Chart from 'chart.js/auto';

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

  const doc = document.getElementById('canvas') as HTMLCanvasElement;


  new Chart(doc, {
    type: "line",
    data: mydata,
  });
};


export const TopPage = () => {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo";

  fetch(url)
    .then((data) => data.json())
    .then((json) => drawChart(json));

  return (
    <div>
      <div id="App">天気</div>
      <canvas width="1280" height="720" id="canvas"></canvas>
    </div>
  );
};
