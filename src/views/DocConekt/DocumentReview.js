import React, { useState, useEffect } from "react";
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
import { openProjectModal, inviteUserToConsortium } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { registryContract } from 'registryContract';
import { partnerContract, partnerAddress } from 'partnersContract';
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from "components/CustomModal/Modal";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Icon, Button, Divider, TextField } from '@material-ui/core';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';

function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}


const Projects = (props) => {

  const [projectInviteList, setProjectInviteList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [inviteSent, setInviteSent] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    // ReviewersAdded
    // partnerContract.getPastEvents('ReviewersAdded', {
    //     filter: { partnerOrganizationID: props.user.user[1] },
    //     fromBlock: 0,
    //     toBlock: 'latest'
    //   }, function (error, events) {

    //   })
  }, []);




  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
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
              projectInviteList.length !== 0 ?
                <MaterialTable
                  columns={[
                    { title: "Host Organization", field: "name" },
                    { title: "Partner Role", field: "partnerRole" },
                    { title: "Organization ID", field: "hostOrganizationID" },
                    { title: 'time', render: rowData => <p>{moment(rowData['timestamp'] * 1000).format("DD-MM-YYYY h:mm:ss")}</p> },
                    { title: "Action", render: rowData => <> {rowData.status ? <Button variant="contained" color="secondary" onClick={closePartnership(rowData)} >Cancel Partnership</Button> : <Button variant="contained" color="primary" onClick={acceptInvite(rowData)}>Accept Invite</Button>} </> },
                    // { title: "Project Id", field: "projectID" }
                  ]}
                  data={projectInviteList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true
                  }}
                />
                :
                <h3>No New Invites Found!</h3>
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
export default connect(mapStateToProps, { openProjectModal, inviteUserToConsortium })(withStyles(dashboardStyle)(Projects));
