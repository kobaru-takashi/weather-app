import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { JP_COORDINATES} from "../../../data/area-url";
import { Sidebar } from "../sidebar/sidebar";

export const Temperature = () => {
  const [temperatureChart, setTemperatureChart] = useState<Chart | null>(null);
  const [disabledList, setDisabledList] = useState<boolean[]>(JP_COORDINATES.map((_) => false));
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

  const onChangeJsonData = (latitude: number, longitude: number) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChartTemperature(json));
  };

  const changeIndex = useCallback((v: number) => {
    setDisabledIndex(v);
  },[disableIndex, disabledList]);

  useEffect(() => {
    setDisabledList(disabledList.map((disabled, i) => disabled = i === disableIndex ? true : false));
  },[disableIndex]);

  useEffect(() => {
    onChangeJsonData(JP_COORDINATES[0].latitude, JP_COORDINATES[0].longitude);
  }, []);

  return (
    <>
      <Sidebar/>
      <h1> --- 気温 ---</h1>
      <div id="chartTemperature" style={{ width: 600, height: 300 }}>
        <canvas id="temperature"></canvas>
      </div>
      {
        JP_COORDINATES.map((v,i) => {
          return(
            <Button
            key={`JP_COORDINATES_${i}`}
            label={`【${v.name}】　最高気温＆最低気温`}
            onClick={()=>{
              onChangeJsonData(v.latitude, v.longitude);
              changeIndex(i);
            }}
            disabled={disabledList[i]}
          />
          );
        })
      }
    </>
  );
};
