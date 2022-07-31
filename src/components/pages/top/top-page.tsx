import React, { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Temperature } from "../graph/temperature";
import { WindVelocity } from "../graph/wind-velocity";
import { Precipitation } from "../graph/precipitation";
import { SensoryTemperature } from "../graph/sensory-temperature";
import { HighestTemperature } from "../graph/highest-temperature";
import { HighLowTemperature } from "../graph/high-low-temperature";

export const TopPage = () => {
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [isTemperature, setIsTemperature] = useState(true);

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

  useEffect(() => {
  }, []);

  return (
    <div>
      <Temperature/>
      <WindVelocity/>
      <Precipitation/>
      <SensoryTemperature/>
      <HighestTemperature/>
      <HighLowTemperature/>
    </div>
  );
};
