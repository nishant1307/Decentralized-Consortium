import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Page404 from "views/ErrorPages/Page404.js";
import Login from "views/Login.jsx";
import Signup from "views/Signup.jsx";
import Register from "views/Register/Register.js";
import RecoverAccount from "views/RecoverAccount.jsx";
import RegisterOrganization from "views/RegisterOrganization";
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import "assets/css/material-dashboard-react.css?v=1.7.0";

const loading = <div className="loader"></div>;

const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store = { store }>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={loading}>
        <Router history={hist}>
          <Switch>
            <Route path="/dashboard" component={Admin} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/register" component={Register} />
            <Route path="/recover" component={RecoverAccount} />
            <Route path="/registerOrganization" component ={RegisterOrganization} />
            <Route component={Page404}/>
          </Switch>
        </Router>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
