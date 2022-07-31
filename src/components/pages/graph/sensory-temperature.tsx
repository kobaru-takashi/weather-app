import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { TokyoHST, TokyoLST } from "../../../data/area-url";
import { Sidebar } from "../sidebar/sidebar";

export const SensoryTemperature = () => {
  const [sensoryTemperatureChart, setSensoryTemperatureChart] =
    useState<Chart | null>(null);
  const [disabledList, setDisabledList] = useState([false, false]);
  const [disableIndex, setDisabledIndex] = useState(0);

  const drawChartSensoryTemperatureH = (json: any) => {
    const myData = {
      labels: json.daily.time,
      datasets: [
        {
          label: "最高気温",
          data: json.daily.temperature_2m_max,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "最高体感気温",
          data: json.daily.apparent_temperature_max,
          borderColor: "rgb(75, 75, 192)",
        },
      ],
    };
    const table = "sensoryTemperature";

    if (sensoryTemperatureChart) {
      sensoryTemperatureChart.destroy();
    }
    setSensoryTemperatureChart(
      new Chart(table, {
        type: "line",
        data: myData,
      })
    );
  };

  const drawChartSensoryTemperatureL = (json: any) => {
    const myData = {
      labels: json.daily.time,
      datasets: [
        {
          label: "最低気温",
          data: json.daily.temperature_2m_min,
          borderColor: "rgb(192, 75, 75)",
        },
        {
          label: "最低体感気温",
          data: json.daily.apparent_temperature_min,
          borderColor: "rgb(75, 75, 192)",
        },
      ],
    };
    const table = "sensoryTemperature";

    if (sensoryTemperatureChart) {
      sensoryTemperatureChart.destroy();
    }
    setSensoryTemperatureChart(
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

  const changeIndex = useCallback(
    (v: number) => {
      setDisabledIndex(v);
    },
    [disableIndex, disabledList]
  );

  useEffect(() => {
    setDisabledList(
      disabledList.map(
        (disabled, i) => (disabled = i === disableIndex ? true : false)
      )
    );
  }, [disableIndex]);

  useEffect(() => {
    onChangeJsonData(TokyoHST, drawChartSensoryTemperatureH);
  }, []);

  return (
    <>
      <Sidebar />
      <h1> --- 気温と体感気温比較 --- </h1>
      <div id="chartSensoryTemperature" style={{ width: 600, height: 300 }}>
        <canvas id="sensoryTemperature"></canvas>
      </div>
      <Button
        label="最高体感気温"
        onClick={() => {
          onChangeJsonData(TokyoHST, drawChartSensoryTemperatureH);
          changeIndex(0);
        }}
        disabled={disabledList[0]}
      />
      <Button
        label="最低体感気温"
        onClick={() => {
          onChangeJsonData(TokyoLST, drawChartSensoryTemperatureL);
          changeIndex(1);
        }}
        disabled={disabledList[1]}
      />
    </>
  );
};
