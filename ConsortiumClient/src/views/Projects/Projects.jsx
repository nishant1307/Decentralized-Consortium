import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
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
import CustomLoader from 'components/Loaders/CustomLoader';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {registryContract} from 'registryContract';
const Projects = (props) => {

  const [projectList, setProjectList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(()=> {
    registryContract.methods.getMyProjects().call({
      from: props.auth.user.publicKey
    }).then(res => {
      setProjectList(res);
      setLoader(false);
    });
  }, []);
  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }
  const {classes} = props;
  let projectRender = [];
  projectList.forEach(project => {
    projectRender.push(
      <GridItem key={Math.random()} xs={12} sm={6} md={3}>
        <Link to= {projectURL(project[0])}>
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <Icon>apps</Icon>
            </CardIcon>
            <p className={classes.cardCategory} style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
              {project[0]}
            </p>
            <h3 className={classes.cardTitle} style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
              {project[1]}
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Icon>apps</Icon>
              Open
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
        {loader ?
          <CustomLoader /> :
          projectRender.length !== 0  ?
            projectRender :    
            <h3>No Projects Found!</h3>
        }
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
