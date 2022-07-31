import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui/button";

export const Sidebar = () => {
  const history = useHistory();

  const changeTopPage = useCallback(() => {
    history.push("/");
  }, []);
  const changeTemperature = useCallback(() => {
    history.push("/Temperature");
  }, []);
  const changeWindVelocity = useCallback(() => {
    history.push("/WindVelocity");
  }, []);
  const changePrecipitation = useCallback(() => {
    history.push("/Precipitation");
  }, []);
  const changeSensoryTemperature = useCallback(() => {
    history.push("/SensoryTemperature");
  }, []);
  const changeHighestTemperature = useCallback(() => {
    history.push("/HighestTemperature");
  }, []);
  const changeHighLowTemperature = useCallback(() => {
    history.push("/HighLowTemperature");
  }, []);

  return (
    <>
      <div className="side_bar">
        <ul>
          <li>
            <Button label="トップページ" onClick={changeTopPage} />
          </li>
          <li>
            <Button label="気温グラフ" onClick={changeTemperature} />
          </li>
          <li>
            <Button label="風速グラフ" onClick={changeWindVelocity} />
          </li>
          <li>
            <Button label="降水量グラフ" onClick={changePrecipitation} />
          </li>
          <li>
            <Button label="体感気温グラフ" onClick={changeSensoryTemperature} />
          </li>
          <li>
            <Button label="最高気温グラフ" onClick={changeHighestTemperature} />
          </li>
          <li>
            <Button label="最高気温＆最低気温グラフ" onClick={changeHighLowTemperature} />
          </li>
        </ul>
      </div>
    </>
  );
};
