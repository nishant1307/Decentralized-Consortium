/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {Paper} from '@material-ui/core';
import Button from "components/CustomButtons/Button.jsx";
import moment from "moment";
export default function FixedPlugin(props) {
  const [classes, setClasses] = React.useState("dropdown");
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
    <div
      className={classnames("fixed-plugin")}
      style={{top: "100px"}}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses} >
        <div onClick={handleClick}>
            <AccountBalanceWalletIcon color="primary" fontSize="large"/>
          </div>
        <ul className="dropdown-menu" >
          <li className="header-title">PACKAGE DETAILS</li>
          <li className="adjustments-line">
            <p>Credits: {props.user.credits}</p><br/>
            <p>Days Left: {moment.duration(moment(props.user.endDate*1000).diff(moment()))._data.days}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"])
};
