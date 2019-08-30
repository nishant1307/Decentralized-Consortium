import React from "react";
import {Link} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.arthanium.com">
        www.arthanium.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Powered by '}
      <Link color="inherit" href="https://www.arthanium.org">
      Arthanium
      </Link>
    </Typography>
  );
}
