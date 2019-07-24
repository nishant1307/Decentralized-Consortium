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
import web3 from '../../web3';
import {registryABI} from '../../utils';
const registryContract = new web3.eth.Contract(registryABI, "0x3e0f1d097813cd4a7c50c1668f715b252893a11d");

const Projects = (props) => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    registryContract.methods.getMyProjects().call({
      from : "0x0bd55a9a9cd352d501afa31ec55ec1db1158c200"
    }).then(res => {
      setProjects(res);
    })
  }, []);

  const {classes} = props;
  let projectRender = [];
  projects.forEach(project => {
    projectRender.push(
      <GridItem xs={12} sm={6} md={3}>
        <Link to="/dashboard/projects/1">
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <Icon>apps</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{project.name}</p>
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
        {projectRender}
      </GridContainer>
    </div>
  );
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Projects);
