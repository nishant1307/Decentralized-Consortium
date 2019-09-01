import React, {useState, useEffect} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
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
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { openProjectModal, inviteUserToConsortium } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {registryContract} from 'registryContract';
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from "components/CustomModal/Modal";
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
const Projects = (props) => {

  const [projectInviteList, setProjectInviteList] = useState([]);
  const [inviteUserList, setInviteUserList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [joinProjectModal, setJoinProjectModal] = useState(false);
  const [inviteProjectID, setInviteProjectID] = useState('');
  const [inviteProjectPasscode, setInviteProjectPasscode] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(()=> {
    registryContract.methods.fetchProjectInvites(props.match.params.projectID).call({
      from: props.auth.user.publicKey
    }).then(res => {
      if(res.length==0)
        setLoader(false);
      setProjectInviteList(res);
      res.forEach(userAddress => {
        registryContract.methods.getUserDetails(userAddress).call({
          from: props.auth.user.publicKey
        }).then(userDetails => {
          setInviteUserList(inviteUserList => [
            ...inviteUserList,
            userDetails
          ])
          setLoader(false);
        });
      });
      setProjectInviteList(res);
    });
  }, [props.user.projectCount]);
  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }

  const acceptInvite = (publicKey) => {
      props.inviteUserToConsortium({
        projectID: props.match.params.projectID,
        inviteAddress: publicKey,
        partnerRole: 2
      })
  }

  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Projects Invites
              </h4>
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
          projectInviteList.length !== 0  ?
              <MaterialTable
                  columns={[
                    { title: "User Email", field: "email" },
                    { title: "Organization ID", field: "organizationID" },
                    { render: rowData => <Button onClick = {(e) => acceptInvite(projectInviteList[rowData.tableData.id])}>Accept Invite</Button>}
                  ]}
                  data={inviteUserList}
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
export default connect(mapStateToProps, {openProjectModal, inviteUserToConsortium}) (withStyles(dashboardStyle)(Projects));
