import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import { connect } from 'react-redux';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import ProjectFormModal from "views/ProjectFormModal.js";
import Table from "components/Table/Table.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import web3 from '../../web3';
import { openProjectModal, openDeviceModal, openThingModal } from 'actions/userActions';

import {registryABI, registryAddress} from '../../utils';
const registryContract = new web3.eth.Contract(registryABI, registryAddress);

const Dashboard = (props) => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    registryContract.methods.getMyProjects().call({
      from : "0x0bd55a9a9cd352d501afa31ec55ec1db1158c200"
    }).then(res => {
      let projectList=[];
      res.reverse().forEach((projectData, index) => {
        projectList[index] = ([
          projectData["projectID"],
          projectData["name"],
          projectData["description"],
          projectData["industry"],
          projectData["functionalRoles"]
        ])
      })
      console.log(projectList);
      setProjects(projectList)
    })
  }, [props.user.projectCount]);

  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <Link to="/dashboard/projects">
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Projects</p>
                <h3 className={classes.cardTitle}>
                  {projects.length}
                </h3>
              </CardHeader>
            </Link>
            <CardFooter stats onClick= {props.openProjectModal}>
              <div className={classes.stats}>
                <Icon>add</Icon>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Create new Project
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Link to="/dashboard/partners"><Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Partners</p>
              <h3 className={classes.cardTitle}>2</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card></Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Products</p>
              <h3 className={classes.cardTitle}>10</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Link to="/dashboard/apps"><Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>apps</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Apps</p>
              <h3 className={classes.cardTitle}>2</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card></Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Link to="/dashboard/apps"><Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>People</p>
              <h3 className={classes.cardTitle}>2</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card></Link>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Your Projects
              </h4>
              <p className={classes.cardCategoryWhite}>
                Here is a list of trades you are a part of
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Description", "Industry", "FunctionalRoles"]}
                tableData={projects}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <ProjectFormModal/>
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

export default connect(mapStateToProps, {openProjectModal, openDeviceModal, openThingModal})(withStyles(dashboardStyle)(Dashboard));
