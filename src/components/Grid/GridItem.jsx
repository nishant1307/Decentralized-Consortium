import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Grid } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

function GridItem({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node
};

export default withStyles(style)(GridItem);
