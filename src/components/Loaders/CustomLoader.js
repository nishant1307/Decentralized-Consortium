import React from "react";
import { CircularProgress } from '@material-ui/core';
const CustomLoader = () => {
  return(
    <CircularProgress style={{
      position: "fixed",
      left: "50%",
      top: "35%",
      width: "50px",
      height: "50px",
      zIndex: "9999",
    }}/>
  )
}

export default CustomLoader;
