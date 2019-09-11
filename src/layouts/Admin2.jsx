import React, {Suspense} from "react";
import { Switch, Route } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
const Navbar = React.lazy(() => import('components/Navbars/Navbar.jsx'));
const Footer = React.lazy(() => import('components/Footer/Footer.jsx'));
const Sidebar = React.lazy(() => import('components/Sidebar/Sidebar.jsx'));
const Page404 = React.lazy(() => import('views/ErrorPages/Page404.js'));
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import sidebarRoutes from "sidebarRoutes.js";
import styles from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {logoutUser} from "actions/authentication";
import image from "assets/images/secure-min.jpg";
import logo from "assets/img/logo.png";
import routes from "routes.js"
import { LinearProgress } from '@material-ui/core';
const loading = <LinearProgress />;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return (
        <Route
          exact path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    })}
    <Route component= {Page404} />
  </Switch>
);

const useStyles = makeStyles(styles);

function Admin({ ...props }) {
  // styles
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const signOut = (e) => {
    e.preventDefault()
    props.logoutUser(props.history);
  }

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return (window.location.pathname).search("location") === -1;
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={sidebarRoutes}
        logoText={"Consortium App"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"blue"}
        {...props}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          onLogout={signOut}
          {...props}
        />
        <Suspense fallback={loading}>
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        </Suspense>
        <FixedPlugin
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
          {...props}
        />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps, {logoutUser})(Admin);
