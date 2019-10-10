import React from "react";
import { Link } from "react-router-dom"
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Popper as Poppers,
  Divider,
} from '@material-ui/core';
// @material-ui/icons
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import moment from "moment";
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles(styles);

const AdminNavbarLinks = (props) => {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
    console.log(event.target);
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <Tooltip title={<h4>Dashboard</h4>}>
        <Link to="/dashboard/home" style={{ color: '#555555' }}>
          {/* <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Dashboard"
            className={classes.buttonLink}
          > */}
          <Dashboard fontSize="inherit" style={{ fontSize: 30, marginRight: 15 }} className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
          {/* </Button> */}
        </Link>
      </Tooltip>
      <Tooltip title={<h4>Project Invitations</h4>}>
        <Link to="/dashboard/projectinvites" style={{ color: '#555555' }}>
          {/* <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Dashboard"
            className={classes.buttonLink}
          > */}
          <InsertInvitationIcon fontSize="inherit" style={{ fontSize: 30, marginRight: 15 }} className={classes.icons} />
          {/* <span className={classes.notifications}>10</span> */}
          {/* </Button> */}
        </Link>
      </Tooltip>
      {/* <Tooltip title={<h4>Notifications</h4>}> */}
      <div className={classes.manager}>
        {/* <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickNotification}
            className={classes.buttonLink}
          > */}
        <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} style={{ marginRight: 15 }} badgeContent={props.user.notificationList.length} color="primary">
          <Notifications onClick={handleClickNotification} fontSize="inherit" style={{ fontSize: 30 }} className={classes.icons} />
        </Badge>
        {/* {(props.user.notificationList.length > 0) && <span className={classes.notifications}>{props.user.notificationList.length}</span>} */}
        <Hidden mdUp implementation="css">
          <p onClick={handleCloseNotification} className={classes.linkText}>
            Notification
            </p>
        </Hidden>
        {/* </Button> */}
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
          style={{ marginTop: 7 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {props.user.notificationList.length === 0 && <MenuItem
                      className={classes.dropdownItem}
                      disabled
                    >
                      No New Notifications
                      </MenuItem>}
                    {props.user.notificationList.map((notification, index) => {
                      return (
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={classes.dropdownItem}
                        >
                          <ArrowRightIcon />{notification}
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      {/* </Tooltip> */}
      <Tooltip title={
        <div style={{ width: "auto", height: "auto" }}>
          <h4>PACKAGE DETAILS</h4>
          <h6>Credits: {props.user.credits}</h6>
          <h6>Days Left: {moment.duration(moment(props.user.endDate * 1000).diff(moment()))._data.days}</h6>
        </div>}>
        <AccountBalanceWalletIcon fontSize="inherit" style={{ fontSize: 30, marginRight: 15 }} className={classes.icons} />
      </Tooltip>
      <div className={classes.manager}>
        {/* <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        > */}
        <Person onClick={handleClickProfile} fontSize="inherit" style={{ fontSize: 30, marginRight: 15 }} className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Account Settings</p>
        </Hidden>
        {/* </Button> */}
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
          style={{ marginTop: 7 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <Link to="/dashboard/user"><MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      <Person />Profile
                    </MenuItem>
                    </Link>
                    <Link to="/dashboard/settings">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        <SettingsIcon />
                        Settings
                    </MenuItem>
                    </Link>
                    {props.user.user[5] === "1" && <Link to="/dashboard/people">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        <PeopleIcon />
                        People
                    </MenuItem>
                    </Link>}
                    <Divider light />
                    <MenuItem
                      onClick={props.onLogout}
                      className={classes.dropdownItem}
                    >
                      <ExitToAppIcon />
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div >
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})


export default connect(mapStateToProps)(AdminNavbarLinks);
