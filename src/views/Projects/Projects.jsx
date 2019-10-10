import React, { Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
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
import { openProjectModal, joinProjectRequest } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { registryContract } from 'registryContract';
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from "components/CustomModal/Modal";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Icon, Button, Divider, TextField, LinearProgress, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const loading = <LinearProgress />;

const Projects = (props) => {

  const [projectList, setProjectList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [joinProjectModal, setJoinProjectModal] = useState(false);
  const [inviteProjectID, setInviteProjectID] = useState('');
  const [inviteProjectPasscode, setInviteProjectPasscode] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      if (props.user.user[5] != 0) {
        setIsAdmin(true);
      }
    } catch (err) {
      console.log(err);
    }

    registryContract.methods.getMyProjects().call({
      from: props.auth.user.publicKey
    }).then(res => {
      setProjectList(res);
      // console.log(res);
      setLoader(false);
    });
  }, [props.user.projectCount]);
  const projectURL = (projectID) => {
    return "/dashboard/projects/" + projectID;
  }

  const joinProject = () => {
    props.joinProjectRequest({
      projectID: inviteProjectID,
      projectPasscode: inviteProjectPasscode
    });
    setInviteSent(true);
  }

  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Projects
              </h4>
              {isAdmin &&
                <Tooltip title={"Create new project"}>
                  <AddBoxIcon style={{ float: "right" }} onClick={props.openProjectModal} />
                </Tooltip>}
            </CardHeader>
            {loader ?
              <React.Fragment>
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
              </React.Fragment> :
              <MaterialTable
                columns={[
                  { sorting: false, render: rowData => <Link to={{ pathname: projectURL(rowData.projectID), state: { projectDetails: rowData } }}><ExitToAppIcon /></Link> },
                  { title: "Project Name", field: "name" },
                  { title: "Industry", field: "industry" },
                  { title: "Project Admin", field: "projectAdmin" },
                ]}
                data={projectList}
                title=""
                options={{
                  search: true,
                  exportButton: true,
                  headerStyle: {
                    fontSize: "11pt"
                  }
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "No Projects Found!"
                  }
                }}
                detailPanel={rowData => {
                  return (
                    <GridItem xs={12} sm={12} md={12} style={{ justifyContent: "center" }}>
                      <Card>
                        <CardHeader color="primary">
                          <strong>Project Info</strong>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <b>Project Name:</b> {rowData.name}<br />
                          <b>Project ID: </b>{rowData.projectID}<br />
                          <b>Project Description:</b> {rowData.description}<br />
                          <b>Project Industry:</b> {rowData.industry}<br />
                        </CardBody>
                      </Card>
                    </GridItem>
                  )
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
              />
            }
          </Card>
        </GridItem>
      </GridContainer>
      <Suspense fallback={loading}>
        <ProjectFormModal />
      </Suspense>
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
export default connect(mapStateToProps, { openProjectModal, joinProjectRequest })(withStyles(dashboardStyle)(Projects));
