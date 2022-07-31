import { Redirect, Switch, Route } from "react-router-dom";
import { HighLowTemperature } from "../components/pages/graph/high-low-temperature";
import { HighestTemperature } from "../components/pages/graph/highest-temperature";
import { Precipitation } from "../components/pages/graph/precipitation";
import { SensoryTemperature } from "../components/pages/graph/sensory-temperature";
import { Temperature } from "../components/pages/graph/temperature";
import { WindVelocity } from "../components/pages/graph/wind-velocity";
import { TopPage } from "../components/pages/top/top-page";

export const Router = (
  <Switch>
    <Route exact path="/" component={TopPage} />
    <Route exact path="/Temperature" component={Temperature} />
    <Route exact path="/HighLowTemperature" component={HighLowTemperature} />
    <Route exact path="/HighestTemperature" component={HighestTemperature} />
    <Route exact path="/Precipitation" component={Precipitation} />
    <Route exact path="/SensoryTemperature" component={SensoryTemperature} />
    <Route exact path="/WindVelocity" component={WindVelocity} />
    <Redirect path="/" to={"/"} />
  </Switch>
);
