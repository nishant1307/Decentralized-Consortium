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
import Skeleton from '@material-ui/lab/Skeleton';
const ProjectFormModal = React.lazy(() => import('views/ProjectFormModal.js'));
import { openProjectModal, openDeviceModal, openThingModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {registryContract} from 'registryContract';
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
const Projects = (props) => {

  const [projectList, setProjectList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(()=> {
    registryContract.methods.getMyProjects().call({
      from: props.auth.user.publicKey
    }).then(res => {
      setProjectList(res);
      console.log(res);
      setLoader(false);
    });
  }, []);
  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }
  const {classes} = props;

  return (
    <div>
      <GridContainer>
        {loader ?
          <React.Fragment>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  My Projects
                </h4>
                <AddBoxIcon onClick={props.openProjectModal}/>
              </CardHeader>
            <Skeleton width="80%"/>
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            <Skeleton width="80%" />
            </Card>
          </GridItem>
          </React.Fragment> :
          projectList.length !== 0  ?
          <GridItem xs={12} sm={12} md={12}>
            <Card plain>
              <CardHeader plain color="primary">
                <h4 className={classes.cardTitleWhite}>
                  My Projects
                </h4>
                <AddBoxIcon onClick={props.openProjectModal}/>
              </CardHeader>
              <MaterialTable
                  columns={[
                    { title: "Project Name", field: "projectID" , render: rowData => <Link to= {projectURL(rowData.projectID)}>Go to Project</Link>},
                    { title: "Project Name", field: "name" },
                    { title: "Project ID", field: "projectID" },
                    { title: "Description", field: "description"},
                    { title: "Industry", field: "industry"},
                    { title: "Project Admin", field: "projectAdmin"},
                  ]}
                  data={projectList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true
                  }}
                />
            </Card>
          </GridItem>
             :
            <h3>No Projects Found!</h3>
        }
      </GridContainer>
      <ProjectFormModal />
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
export default connect(mapStateToProps, {openProjectModal}) (withStyles(dashboardStyle)(Projects));
