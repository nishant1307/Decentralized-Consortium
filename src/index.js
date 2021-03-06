import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
const Admin = React.lazy(() => import('layouts/Admin2.jsx'));
const AdminPanel = React.lazy(() => import('layouts/AdminPanel.jsx'));
import { PrivateRoute } from './PrivateRoute'
const Kyc = React.lazy(() => import('views/KYC/Kyc'));
const InvitedUserKYC = React.lazy(() => import('views/KYC/InvitedUserKYC'));
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
const Page404 = React.lazy(() => import('views/ErrorPages/Page404.js'));
const Login = React.lazy(() => import('views/Login.jsx'));
const RecoverAccount = React.lazy(() => import('views/RecoverAccount.jsx'));
import "assets/css/material-dashboard-react.css?v=1.7.0";
import { LinearProgress } from '@material-ui/core';
//v1
const Landing = React.lazy(() => import('views/LandingPagev1/Landing'));
const Platform = React.lazy(() => import('views/LandingPagev1/Platform'))
const Solutions = React.lazy(() => import('views/LandingPagev1/Solutions'))
const Partners = React.lazy(() => import('views/LandingPagev1/Partners'))
const Industry = React.lazy(() => import("views/LandingPagev1/Industry"));
const AboutUs = React.lazy(() => import("views/LandingPagev1/AboutUs"));
const OurTeam = React.lazy(() => import("views/LandingPagev1/OurTeam"));
const Verify = React.lazy(() => import("views/Claims&Certifications/GlobalVerify"));
const SignupGoogleForm = React.lazy(() => import("views/SignupGoogleForm"));
const ErrorBoundary = React.lazy(() => import('./ErrorBoundary'))
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "pagetransition.css";
const loading = <LinearProgress />;
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={loading}>
        <BrowserRouter>
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/platform" component={Platform} />
              <Route exact path="/solutions" component={Solutions} />
              <Route exact path="/partners" component={Partners} />
              <Route exact path="/industry" component={Industry} />
              <Route exact path="/aboutus" component={OurTeam} />
              <Route exact path="/ourTeam" component={OurTeam} />
              <Route path="/verify" component={Verify} />
              <Route path="/dashboard" component={Admin} />
              <PrivateRoute path="/admin" component={AdminPanel} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignupGoogleForm} />
              <Route path="/register" component={Kyc} />
              <Route exact path="/invitation" component={InvitedUserKYC} />
              <Route path="/recover" component={RecoverAccount} />
              <Route component={Page404} />
            </Switch>
          </ErrorBoundary>
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>
  ,
  document.getElementById("root")
);
