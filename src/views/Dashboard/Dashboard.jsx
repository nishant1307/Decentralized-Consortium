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
import Claims from "views/Claims&Certifications/Claims";
import { Divider, Tabs, Tab, Typography, Box } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

// import ListItemText from '@material-ui/core/ListItemText';
const Dashboard = (props) => {

  const [productCount, setProductCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const {classes} = props;
  const [userName, setUserName] = useState('');

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
    <h4>Welcome to Arthanium</h4>
      {props.user && <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/projects">
          <Card>
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
          <Card>
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
          <Card>
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
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
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
        {props.user.organization && <GridItem xs={12} sm={6} md={6}>
          <Card style={{height: "200px"}}>
            <CardHeader>
              <strong>Organization Info</strong>
            </CardHeader>
            <Divider/>
            <CardBody>
                <b>Organization Name:</b> {props.user.organization[1]}<br/>
                <b>Organization ID: </b>{props.user.organization[0]}
            </CardBody>
          </Card>
        </GridItem>}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader>
              <strong>Claims & Certifications</strong>
            </CardHeader>
            <Divider/>
            <CardBody style={{maxHeight: '150px', overflow: 'auto'}} >
              <Tabs value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered>
                <Tab label="Claims" {...a11yProps(0)} />
                <Tab label="Certifications" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Claims/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                Certifications Coming Soon
              </TabPanel>
              {/**<TabContent activeTab= {state.activeTab}>
                <TabPane tabId="1">
                  <ListGroup>
                    <ListGroupItem>
                      {makeAddedList()}
                    </ListGroupItem>
                  </ListGroup>
                </TabPane>
                <TabPane tabId="2">
                      {
                        state.urls.length !== 0 && state.urls.map((url, i) => {
                          // return (<ListGroupItem><a href={url}>{url}</a></ListGroupItem>)
                          return (<ListGroupItem>
                            Certificate Name : {url.name}
                            <img style={{
                              padding: 10
                            }} src={url.url} key={i + 1} alt="Smiley face" height="100" width="100" /></ListGroupItem>)
                        })
                      }
                </TabPane>
              </TabContent>*/}
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps, { openProjectModal, openDeviceModal, openThingModal })(withStyles(dashboardStyle)(Dashboard));
