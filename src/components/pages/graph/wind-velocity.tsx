import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { TokyoHG, TokyoHWV, TokyoHWVAndHG } from "../../../data/area-url";
import { Sidebar } from "../sidebar/sidebar";

export const WindVelocity = () => {
  const [windVelocityChart, setWindVelocityChart] = useState<Chart | null>(null);
  const [disabledList, setDisabledList] = useState([false, false, false]);
  const [disableIndex, setDisabledIndex] = useState(0);

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
    onChangeJsonData(TokyoHWVAndHG, drawChartWindVelocity);
  }, []);

  return (
    <>
      <Sidebar />
      <h1> --- 風速 --- </h1>
      <div id="chartWindVelocity" style={{ width: 600, height: 300 }}>
        <canvas id="windVelocity"></canvas>
      </div>
      <Button
        label="東京最高風速＆突風"
        onClick={() => {
          onChangeJsonData(TokyoHWVAndHG, drawChartWindVelocity);
          changeIndex(0);
        }}
        disabled={disabledList[0]}
      />
      <Button
        label="東京最高風速"
        onClick={() => {
          onChangeJsonData(TokyoHWV, drawChartWindVelocity);
          changeIndex(1);
        }}
        disabled={disabledList[1]}
      />
      <Button
        label="東京最低突風"
        onClick={() => {
          onChangeJsonData(TokyoHG, drawChartWindVelocity);
          changeIndex(2);
        }}
        disabled={disabledList[2]}
      />
    </>
  );
};
