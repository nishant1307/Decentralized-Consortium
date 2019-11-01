import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DescriptionIcon from '@material-ui/icons/Description';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Button from "components/CustomButtons/Button";
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { openProjectModal, openDeviceModal, openThingModal } from 'actions/userActions';
import productContract from "productContract";
import {registryContract} from "registryContract";
import {parseJSONFromIPFSHash} from "utils";
import { Typography, Box } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Tour from 'reactour';

const steps = [
  {
    selector: '[data-tut="container_grid"]',
    content: 'Welcome to the Dashboard',
  },
  {
    selector: '[data-tut="project__card"]',
    content: 'This is Projects',
  },
  {
    selector: '[data-tut="device__card"]',
    content: 'This is Device',
  },
  {
    selector: '[data-tut="product__card"]',
    content: 'This is Product',
  },
  {
    selector: '[data-tut="document__card"]',
    content: 'This is Document',
  }
]

const Dashboard = (props) => {

  const [productCount, setProductCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const {classes} = props;
  const [userName, setUserName] = useState('');
  const [tourOpen, setTourOpen] = useState(false);
  return (
    <div data-tut="container_grid">
    <h4>Welcome to Arthanium</h4>
      {props.user && <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/projects">
          <Card data-tut="project__card">
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <DescriptionIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Projects</p>
              <h3 className={classes.cardTitle}>
                {props.user.projectCount}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <VisibilityIcon/>
                View your Projects
              </div>
            </CardFooter>
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/devices">
          <Card data-tut="device__card">
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <DeviceHubIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Devices</p>
              <h3 className={classes.cardTitle}>{props.user.deviceCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <VisibilityIcon/>
              View Devices
              </div>
            </CardFooter>
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/products">
          <Card data-tut="product__card">
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Products</p>
              <h3 className={classes.cardTitle}>{props.user.thingCount}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <VisibilityIcon/>
                View your Products
            </div>
            </CardFooter>
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/documents">
          <Card data-tut="document__card">
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <FileCopyIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Docs</p>
              <h3 className={classes.cardTitle}>{props.user.docCount}</h3>
            </CardHeader>
            <CardFooter onClick={props.openDocModal} stats>
              <div className={classes.stats}>
                <VisibilityIcon/>
                  View your Documents
              </div>
            </CardFooter>
          </Card>
          </Link>
        </GridItem>
      </GridContainer>}
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="primary" >
              <Typography>Organization Info</Typography>
            </CardHeader>
            {props.user.organization ? <CardBody>
                <b>Organization Name:</b> {props.user.organization[1]}<br/>
                <b>Organization ID: </b>{props.user.organization[0]}<br/>
            </CardBody>
          :
          <>
            <Skeleton width="100%"/>
            <Skeleton width="60%" />
          </>}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Button fullWidth onClick={() => setTourOpen(true)}>Start Tour</Button>
        </GridItem>
        </GridContainer>
        <Tour
          steps={steps}
          isOpen={tourOpen}
          onRequestClose={() => setTourOpen(false)}
        />
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps, { openProjectModal, openDeviceModal, openThingModal })(withStyles(dashboardStyle)(Dashboard));
