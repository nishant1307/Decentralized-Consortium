import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
const Navbar = React.lazy(() => import('components/Navbars/Navbar.jsx'));
const Footer = React.lazy(() => import('components/Footer/Footer.jsx'));
const Sidebar = React.lazy(() => import('components/Sidebar/Sidebar.jsx'));
const Page404 = React.lazy(() => import('views/ErrorPages/Page404.js'));
import sidebarRoutes from "adminSidebarRoutes.js";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {logoutUser} from "actions/authentication";
import image from "assets/images/secure-min.jpg";
import logo from "assets/img/logo.png";
import routes from "../views/Admin/Admin";

let ps;

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

class Dashboard extends React.Component {
  state = {
    mobileOpen: false
  };

  signOut = (e) => {
    e.preventDefault()
    this.props.logoutUser(this.props.history);
  }

  mainPanel = React.createRef();
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return (window.location.pathname).search("location") === -1;
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push('/login');
    // }
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={sidebarRoutes}
          logoText={"Consortium App"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={"blue"}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            onLogout={this.signOut}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})


export default connect(mapStateToProps, {logoutUser})(withStyles(dashboardStyle)(Dashboard));
