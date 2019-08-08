import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Kyc from 'views/KYC/Kyc';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import "assets/css/material-dashboard-react.css?v=1.7.0";
const Page404 = React.lazy(() => import('views/ErrorPages/Page404.js'));
const Login = React.lazy(() => import('views/Login.jsx'));
const Signup = React.lazy(() => import('views/Signup.jsx'));
const Register = React.lazy(() => import('views/Register/Register.js'));
const RecoverAccount = React.lazy(() => import('views/RecoverAccount.jsx'));
const RegisterOrganization = React.lazy(() => import('views/RegisterOrganization'));
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
            <Route path="/kyc" component={Kyc} />
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
