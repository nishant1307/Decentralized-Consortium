import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import web3 from '../../web3';
import {registryABI} from '../../utils';
const registryContract = new web3.eth.Contract(registryABI, "0x3e0f1d097813cd4a7c50c1668f715b252893a11d");

const ProjectPage = (props) => {

  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle}>People</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Description
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>work</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle}>Partners</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Description
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Link to="/dashboard/maps">
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>location_city</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle}>Location</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Description
              </div>
            </CardFooter>
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>device_hub</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle}>Devices</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Go to IotConekt App
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>file_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle}>Docs</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Go to DocConekt App
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>apps</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h4 className={classes.cardTitle}>Journey</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Go to DocConekt App
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ProjectPage);
