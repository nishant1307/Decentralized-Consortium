import React from "react";
import PropTypes from "prop-types";
// core components
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import { withStyles } from '@material-ui/core/styles';

function Quote({ ...props }) {
  const { classes, text, author } = props;
  return (
    <blockquote className={classes.defaultFontStyle + " " + classes.quote}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.node,
  author: PropTypes.node
};

export default withStyles(typographyStyle)(Quote);
