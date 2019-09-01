import React from "react";
import PropTypes from "prop-types";
// core components
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import { withStyles } from '@material-ui/core/styles';

function Danger({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.dangerText}>
      {children}
    </div>
  );
}

Danger.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default withStyles(typographyStyle)(Danger);
