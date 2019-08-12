import React, { Component } from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Index from "../components/views/index/index.js";
import User from "../components/views/user/index.js";
import Book from "../components/views/book/index.js";
import Details from "../components/views/details/index.js";
import About from "../components/views/about/index.js";

import routePaths from "./routerPaths.js";

const Login = () => {
  return <div className="login">你已经登录了....</div>;
};
let login = false;

class RouterIndex extends Component {
  render(h) {
    return (
      <Switch>
        {/** 访问 / 重定向到 /index 下 */}
        <Route
          exact
          path="/"
          render={() => (login ? <Login /> : <Redirect to="/index" />)}
        />
        <Route path={routePaths.INDEX} component={Index} />
        <Route path={routePaths.USER} component={User} />
        <Route path={routePaths.BOOK} component={Book} />
        <Route path={routePaths.DETAILS} component={Details} />
        <Route path={routePaths.ABOUT} component={About} />
      </Switch>
    );
  }
}

export default RouterIndex;
