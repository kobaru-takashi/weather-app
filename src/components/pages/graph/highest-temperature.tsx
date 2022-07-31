
import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export const HighestTemperature = () => {
  const [temperatureInputChart, setTemperatureInputChart] = useState<Chart | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const changeStartDate = useCallback((v: string) => {
    setStartDate(v);
  }, [startDate]);
  const changeEndDate = useCallback((v: string) => {
    setEndDate(v);
  }, [endDate]);

  const drawChartTemperatureInput = (json: any) => {
    const myData = {
      labels: json.daily.time,
      datasets: [
        {
          label: "最高気温",
          data: json.daily.temperature_2m_max,
          borderColor: "rgb(192, 75, 75)",
        },
      ],
    };
    const table = "temperatureInput";

    if (temperatureInputChart) {
      temperatureInputChart.destroy();
    }
    setTemperatureInputChart(
      new Chart(table, {
        type: "line",
        data: myData,
      })
    );
  };

  const onChangeTemperatureInput = (start: string, end: string) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_max&current_weather=true&timezone=Asia%2FTokyo&start_date=2022-07-${start}&end_date=2022-07-${end}`;
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChartTemperatureInput(json));
  };

//   useEffect(() => {
//   }, []);

  return (
    <>
      <div>最高気温</div>
      <div id="chartHighestTemperature" style={{width:600, height:300}}>
        <canvas id="temperatureInput"></canvas>
      </div>
      <Button label="最高気温" onClick={() => onChangeTemperatureInput(startDate, endDate)} />
      <Input placeholder="開始日 01～31" maxLength={2} onChange={(e) => changeStartDate(e.target.value)}/>
      <Input placeholder="終了日 01～31" maxLength={2} onChange={(e) => changeEndDate(e.target.value)}/>
    </>
  );
};
