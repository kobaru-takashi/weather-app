import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import {
  New_YorkHT,
  New_YorkHTAndLT,
  New_YorkLT,
  New_YorkP,
  TokyoHG,
  TokyoHST,
  TokyoHT,
  TokyoHTAndLT,
  TokyoHWV,
  TokyoHWVAndHG,
  TokyoLST,
  TokyoLT,
  TokyoP,
} from "../data/area-url";
import { Input } from "../../ui/input";

export const TopPage = () => {
  const [temperatureChart, setTemperatureChart] = useState<Chart | null>(null);
  const [windVelocityChart, setWindVelocityChart] = useState<Chart | null>(null);
  const [precipitationChart, setPrecipitationChart] = useState<Chart | null>(null);
  const [sensoryTemperatureChart, setSensoryTemperatureChart] = useState<Chart | null>(null);
  const [temperatureInputChart, setTemperatureInputChart] = useState<Chart | null>(null);
  const [temperatureRadioChart, setTemperatureRadioChart] = useState<Chart | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isTemperature, setIsTemperature] = useState(true);

  const changeStartDate = useCallback((v: string) => {
    setStartDate(v);
  }, [startDate]);
  const changeEndDate = useCallback((v: string) => {
    setEndDate(v);
  }, [endDate]);

  // const drawChart = (
  //   labels: any,
  //   label1: string,
  //   data1: any,
  //   label2: string,
  //   data2: any,
  //   table: string,
  //   chart: Chart | null,
  //   chartCallback: React.Dispatch<React.SetStateAction<Chart | null>>
  // ) => {
  //   const myData = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: label1,
  //         data: data1,
  //         borderColor: "rgb(192, 75, 75)",
  //       },
  //       {
  //         label: label2,
  //         data: data2,
  //         borderColor: "rgb(75, 75, 192)",
  //       },
  //     ],
  //   };

  //   if (chart) {
  //     chart.destroy();
  //   }

  //   chartCallback(
  //     new Chart(table, {
  //       type: "line",
  //       data: myData,
  //     })
  //   );
  // };

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
  const onChangeTemperatureInput = (start: string, end: string) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=temperature_2m_max&current_weather=true&timezone=Asia%2FTokyo&start_date=2022-07-${start}&end_date=2022-07-${end}`;
    fetch(url)
      .then((data) => data.json())
      .then((json) => drawChartTemperatureInput(json));
  };

  useEffect(() => {
    onChangeJsonData(New_YorkHTAndLT, drawChartTemperature);
    onChangeJsonData(TokyoHWVAndHG, drawChartWindVelocity);
    onChangeJsonData(New_YorkP, drawChartPrecipitation);
    onChangeJsonData(TokyoHST, drawChartSensoryTemperatureH);
    onChangeJsonData(TokyoHT, drawChartTemperatureRadio);
  }, []);

  return (
    <div>
      <div>気温</div>
      <div id="chartReport">
        <canvas id="temperature"></canvas>
      </div>
      <Button
        label="ニューヨーク最高気温＆最低気温"
        onClick={() => onChangeJsonData(New_YorkHTAndLT, drawChartTemperature)}
      />
      <Button
        label="ニューヨーク最高気温"
        onClick={() => onChangeJsonData(New_YorkHT, drawChartTemperature)}
      />
      <Button
        label="ニューヨーク最低気温"
        onClick={() => onChangeJsonData(New_YorkLT, drawChartTemperature)}
      />
      <Button
        label="東京最高気温＆最低気温"
        onClick={() => onChangeJsonData(TokyoHTAndLT, drawChartTemperature)}
      />
      <Button
        label="東京最高気温"
        onClick={() => onChangeJsonData(TokyoHT, drawChartTemperature)}
      />
      <Button
        label="東京最低気温"
        onClick={() => onChangeJsonData(TokyoLT, drawChartTemperature)}
      />

      <div>風速</div>
      <div id="chartReport">
        <canvas id="windVelocity"></canvas>
      </div>
      <Button
        label="東京最高風速＆突風"
        onClick={() => onChangeJsonData(TokyoHWVAndHG, drawChartWindVelocity)}
      />
      <Button
        label="東京最高風速"
        onClick={() => onChangeJsonData(TokyoHWV, drawChartWindVelocity)}
      />
      <Button
        label="東京最低突風"
        onClick={() => onChangeJsonData(TokyoHG, drawChartWindVelocity)}
      />

      <div>降水量の合計</div>
      <div id="chartReport">
        <canvas id="precipitation"></canvas>
      </div>
      <Button
        label="ニューヨーク降水量"
        onClick={() => onChangeJsonData(New_YorkP, drawChartPrecipitation)}
      />
      <Button
        label="東京降水量"
        onClick={() => onChangeJsonData(TokyoP, drawChartPrecipitation)}
      />

      <div>気温と体感気温比較</div>
      <div id="chartReport">
        <canvas id="sensoryTemperature"></canvas>
      </div>
      <Button label="最高体感気温" onClick={() => onChangeJsonData(TokyoHST, drawChartSensoryTemperatureH)} />
      <Button label="最低体感気温" onClick={() => onChangeJsonData(TokyoLST, drawChartSensoryTemperatureL)} />

      <div>最高気温</div>
      <div id="chartReport">
        <canvas id="temperatureInput"></canvas>
      </div>
      <Button label="最高体感気温" onClick={() => onChangeTemperatureInput(startDate, endDate)} />
      <Input placeholder="開始日 01～31" maxLength={2} onChange={(e) => changeStartDate(e.target.value)}/>
      <Input placeholder="終了日 01～31" maxLength={2} onChange={(e) => changeEndDate(e.target.value)}/>


      <div>最高気温＆最低気温</div>
      <div id="chartReport">
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
    </div>
  );
};
