import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';

const style = {
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
};

function GridContainer(props) {
  const { classes, children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node
};

export default withStyles(style)(GridContainer);
