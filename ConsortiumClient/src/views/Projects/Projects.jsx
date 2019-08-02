import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
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
import { connect } from 'react-redux';
const Projects = (props) => {
  console.log(props);
  
  const {classes} = props;
  let projectRender = [];
  props.user.projectList.forEach(project => {
    projectRender.push(
      <GridItem key={Math.random()} xs={12} sm={6} md={3}>
        <Link to="/dashboard/projects/1">
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <Icon>apps</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{project[1]}</p>
            <h3 className={classes.cardTitle}></h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <LocalOffer />
              {project.description}
            </div>
          </CardFooter>
        </Card>
        </Link>
      </GridItem>
    )
  })

  return (
    <div>
      <GridContainer>
        {projectRender.length !== 0  ? projectRender : <h3>No Data Found</h3>}
      </GridContainer>
    </div>
  );
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})
export default connect(mapStateToProps) (withStyles(dashboardStyle)(Projects));

