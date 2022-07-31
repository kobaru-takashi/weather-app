import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui/button";

export const TopPage = () => {
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
    <div>
      <Button label="トップページ" onClick={changeTopPage}/>
      <Button label="気温グラフ" onClick={changeTemperature}/>
      <Button label="気温グラフ" onClick={changeWindVelocity}/>
      <Button label="気温グラフ" onClick={changePrecipitation}/>
      <Button label="気温グラフ" onClick={changeSensoryTemperature}/>
      <Button label="気温グラフ" onClick={changeHighestTemperature}/>
      <Button label="気温グラフ" onClick={changeHighLowTemperature}/>
    </div>
  );
};
