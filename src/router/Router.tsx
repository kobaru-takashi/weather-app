import { Redirect, Switch, Route } from "react-router-dom";
import { TopPage } from "../components/pages/top/top-page";

export const Router = (
  <Switch>
    <Route exact path="/" component={TopPage} />
    {/* <Route exact path="/MyPage" component={MyPage} /> */}
    <Redirect path="/" to={"/"} />
  </Switch>
);
