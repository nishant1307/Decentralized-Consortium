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
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
const ProjectFormModal = React.lazy(() => import('views/ProjectFormModal.js'));
import VisibilityIcon from '@material-ui/icons/Visibility';
import { openProjectModal, openDeviceModal, openThingModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {registryContract} from 'registryContract';
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Divider from '@material-ui/core/Divider';
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
  }, [props.user.projectCount]);
  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }
  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Projects
              </h4>
              <AddBoxIcon onClick={props.openProjectModal}/>
            </CardHeader>
        {loader ?
          <React.Fragment>
                <Skeleton width="100%"/>
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
          </React.Fragment> :
          projectList.length !== 0  ?
              <MaterialTable
                  columns={[
                    { title: "", field: "projectID" , render: rowData => <Link to={{ pathname: projectURL(rowData.projectID), state: { projectDetails: rowData} }}><VisibilityIcon/></Link>},
                    { title: "Project Name", field: "name" },
                    { title: "Industry", field: "industry"},
                    { title: "Project Admin", field: "projectAdmin"},
                  ]}
                  data={projectList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true
                  }}
                  detailPanel={rowData => {
                    return (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={9}>
                          <Card style={{height: "200px"}}>
                            <CardHeader>
                              <strong>Project Info</strong>
                            </CardHeader>
                            <Divider/>
                            <CardBody>
                                <b>Project Name:</b> {rowData.name}<br/>
                                <b>Project ID: </b>{rowData.projectID}<br/>
                                <b>Project Description:</b> {rowData.description}<br/>
                                <b>Project Industry:</b> {rowData.industry}<br/>
                            </CardBody>
                          </Card>
                        </GridItem>
                      </GridContainer>
                    )
                  }}
                  onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
             :
            <h3>No Projects Found!</h3>
        }
        </Card>
        </GridItem>
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
