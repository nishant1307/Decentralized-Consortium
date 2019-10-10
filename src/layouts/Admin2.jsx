import React, {Suspense, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
const Navbar = React.lazy(() => import('components/Navbars/Navbar.jsx'));
const Footer = React.lazy(() => import('components/Footer/Footer.jsx'));
const Sidebar = React.lazy(() => import('components/Sidebar/Sidebar.jsx'));
const Page404 = React.lazy(() => import('views/ErrorPages/Page404.js'));
import Modal from "components/CustomModal/Modal";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import sidebarRoutes from "sidebarRoutes.js";
import styles from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {logoutUser} from "actions/authentication";
import image from "assets/images/sidebar.jpg";
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
  const [onlineStatus, setOnlineStatus] = React.useState(true);

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

  useEffect(()=> {
    if (!props.auth.isAuthenticated) {
      props.history.push('/login');
    }
    checkSessionStatus();
    if(navigator.onLine!=onlineStatus){
      setOnlineStatus(navigator.onLine);
    }
  }, [props])

  const checkSessionStatus= () => {
    if(sessionStorage.timestamp) {
      const currentTime = Date.now();
      let expiration = new Date(parseInt(sessionStorage.timestamp));
      expiration.setMinutes(expiration.getMinutes()+30);
      if(expiration < currentTime) {
        sessionStorage.removeItem('privateKey');
        props.logoutUser(props.history);
        setTimeout(function() {
              alert('Your session has expired. Please login again');
        }, 500);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={sidebarRoutes}
        logoText={"Consortium App"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        onLogout={signOut}
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
        {onlineStatus? null:
          <>
            <Modal
            open={!onlineStatus}
            title={"Network connection failed"}
            content={<>You seem to be offline. This may affect your experience on using this platform. <br/>Please check your internet connection and try again</>}
            />
          </>
        }
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
