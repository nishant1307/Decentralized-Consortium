import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Login from './views/Login';
import Signup from './views/Signup';
import RecoverAccount from './views/RecoverAccount';

import "assets/css/material-dashboard-react.css?v=1.7.0";

const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/dashboard" component={Admin} />
      <Route path="/projects/:projectID" component={Admin} />
      {/* <Redirect from="/" to="/dashboard/home" /> */}
      <Route path="/login" component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path="/recover" component={RecoverAccount} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
