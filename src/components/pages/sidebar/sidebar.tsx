import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui/button";
import Paperbase from './Paperbase';

export const Sidebar = () => {
  const [disabledList, setDisabledList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [disableIndex, setDisabledIndex] = useState(0);
  const [isDisable, setIsDisabled] = useState(false);

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

  const changeIndex = useCallback((v: number) => {
    setDisabledIndex(v);
  },[disableIndex, disabledList]);

  useEffect(() => {
    setDisabledList((prev) => {
      return prev.map((disabled, i) => {
        return disabled = i === disableIndex ? true : false
      });
    });
    setDisabledList(disabledList.map((disabled, i) => disabled = i === disableIndex ? true : false));
  },[disableIndex]);

  return (
    <>
      <div className="side_bar">
        <ul>
          <li>
            <Button
              label="トップページ"
              onClick={() => {
                changeTopPage();
                changeIndex(0);
              }}
              disabled={disabledList[0]}
            />
          </li>
          <li>
            <Button
              label="気温グラフ"
              onClick={() => {
                changeTemperature();
                changeIndex(1);
              }}
              disabled={disabledList[1]}
            />
          </li>
          <li>
            <Button
              label="風速グラフ"
              onClick={() => {
                changeWindVelocity();
                changeIndex(2);
              }}
              disabled={disabledList[2]}
            />
          </li>
          <li>
            <Button
              label="降水量グラフ"
              onClick={() => {
                changeIndex(3);
                changePrecipitation();
              }}
              disabled={disabledList[3]}
            />
          </li>
          <li>
            <Button
              label="体感気温グラフ"
              onClick={() => {
                changeSensoryTemperature();
                changeIndex(4);
              }}
              disabled={disabledList[4]}
            />
          </li>
          <li>
            <Button
              label="最高気温グラフ"
              onClick={() => {
                changeHighestTemperature();
                changeIndex(5);
              }}
              disabled={disabledList[5]}
            />
          </li>
          <li>
            <Button
              label="最高気温＆最低気温グラフ"
              onClick={() => {
                changeHighLowTemperature();
                changeIndex(6);
              }}
              disabled={disabledList[6]}
            />
          </li>
        </ul>
      </div>

    </>
  );
};
