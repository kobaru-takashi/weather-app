import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { New_YorkP, TokyoP } from "../../../data/area-url";
import { Sidebar } from "../sidebar/sidebar";

export const Precipitation = () => {
  const [precipitationChart, setPrecipitationChart] = useState<Chart | null>(null);
  const [disabledList, setDisabledList] = useState([false, false]);
  const [disableIndex, setDisabledIndex] = useState(0);

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
    onChangeJsonData(New_YorkP, drawChartPrecipitation);
  }, []);

  return (
    <>
      <Sidebar/>
      <h1> --- 降水量の合計 --- </h1>
      <div id="chartPrecipitation" style={{ width: 600, height: 300 }}>
        <canvas id="precipitation"></canvas>
      </div>
      <Button
        label="ニューヨーク降水量"
        onClick={() => {onChangeJsonData(New_YorkP, drawChartPrecipitation);
          changeIndex(0);
        }}
        disabled={disabledList[0]}
      />
      <Button
        label="東京降水量"
        onClick={() => {onChangeJsonData(TokyoP, drawChartPrecipitation);
          changeIndex(1);
        }}
        disabled={disabledList[1]}
      />
    </>
  );
};
