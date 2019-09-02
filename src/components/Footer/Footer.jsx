/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";
import { ListItem, List } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}

            <a href="https://www.athanium.org" target="_blank" className={classes.a}>
              Powered by Arthanium
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
