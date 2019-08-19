import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import AdminPanel from "layouts/AdminPanel.jsx";
import Kyc from 'views/KYC/Kyc';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import "assets/css/material-dashboard-react.css?v=1.7.0";
const Page404 = React.lazy(() => import('views/ErrorPages/Page404.js'));
const Login = React.lazy(() => import('views/Login.jsx'));
const Signup = React.lazy(() => import('views/Signup.jsx'));
const RecoverAccount = React.lazy(() => import('views/RecoverAccount.jsx'));
const RegisterOrganization = React.lazy(() => import('views/RegisterOrganization'));
const LandingPage = React.lazy(() => import('views/LandingPage/Landing.jsx'));
const IndustryPage = React.lazy(() => import('views/LandingPage/IndustryPage.jsx'));
const IotRegistryPage =  React.lazy(() => import('views/LandingPage/IotRegistryPage.jsx')); 
const Solutions = React.lazy(() => import('views/LandingPage/Solutions.jsx')); 
const ArchitecturePage = React.lazy(() => import('views/LandingPage/ArchitecturePage.jsx')); 
const ConsumerPage = React.lazy(() => import('views/LandingPage/ConsumerPage.jsx')); 
const AboutUsPage = React.lazy(() => import('views/LandingPage/AboutUsPage.jsx')); 
const Contact = React.lazy(() => import('views/LandingPage/Contact.jsx')); 
const TeamPage = React.lazy(() => import('views/LandingPage/TeamPage.jsx')); 
//v1
const Landing = React.lazy(() => import('views/LandingPagev1/Landing')); 

import "assets/css/material-dashboard-react.css?v=1.7.0";

const loading = <div className="loader"></div>;

const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store = { store }>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={loading}>
        <Router history={hist}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/team" component={TeamPage} />
            <Route exact path="/consumer" component={ConsumerPage} />
            <Route exact path="/about" component={AboutUsPage} />
            <Route exact path="/solutions"component={Solutions} />
            <Route exact path="/architecture"component={ArchitecturePage} />
            <Route exact path="/industry"component={IndustryPage} />
            <Route exact path="/iot-registry-platform"component={IotRegistryPage} />
            <Route path="/dashboard" component={Admin} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/register" component={Kyc} />
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
