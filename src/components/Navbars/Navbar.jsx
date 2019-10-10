import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

import { AppBar, Toolbar, IconButton, Hidden } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

function Navbar({ ...props }) {
  function makeBrand() {
    // if(window.location.href="/dashboard/home")
    //   return "Welcome to Arthanium";
    // else
    //   return null;
    // var name;
    // props.routes.map(prop => {
    //   if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
    //     name = prop.name;
    //   }
    //   return null;
    // });
    // return name;
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {<AdminNavbarLinks onLogout={props.onLogout} {...props}/>}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(headerStyle)(Navbar);
