import React from "react";
import { CircularProgress, Modal } from '@material-ui/core';
const CustomLoader = () => {
  return(
    <Modal
      open="true"
      >
    <CircularProgress style={{
      position: "fixed",
      left: "50%",
      top: "35%",
      width: "50px",
      height: "50px",
      zIndex: "9999",
    }}/>
    </Modal>
  )
}

export default CustomLoader;
