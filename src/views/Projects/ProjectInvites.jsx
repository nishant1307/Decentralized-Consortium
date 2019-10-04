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
import {
  Icon, Button, Divider, TextField, Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import web3 from '../../web3';
function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}


const Projects = (props) => {

  const [projectInviteList, setProjectInviteList] = useState([]);
  const [inviteUserList, setInviteUserList] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [joinProjectModal, setJoinProjectModal] = useState(false);
  const [projectData, setProjectData] = useState(undefined);
  // const [inviteProjectPasscode, setInviteProjectPasscode] = useState('');
  // const [inviteSent, setInviteSent] = useState(false);
  const [userListRender, setUserListRender] = useState([]);
  const [allPeople, setPeople] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const forceUpdate = useForceUpdate();
  const [isModalOpen, setModalStatus] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    registryContract.methods.getOrganizationEmployees().call({
      from: props.auth.user.publicKey
    }).then(res => {
      setPeople(res);
      res.forEach(user => {
        // if (!user.adminApprovalStatus) {
          setUserListRender(userListRender => [
            ...userListRender,
            <MenuItem key={Math.random()} name={user.email} value={user.publicKey}>{user.email}</MenuItem>
          ]);
        // }
      })
    })
    let tempData = []
    partnerContract.getPastEvents('PartnerRequestAdded', {
      filter: { partnerOrganizationID: props.user.user[1] },
      fromBlock: 0,
      toBlock: 'latest'
    }, function (error, events) {
      events.forEach(element => {
        // console.log(props.user.user[0]);
        let data = {}
        if (element.returnValues.partnerOrganizationID === props.user.user[1]) {
          partnerContract.methods.getPartnershipStatus(element.returnValues.projectID, element.returnValues.partnerRole).call().then(status => {
            // console.log(status, "status");
            // if (!status) {
            registryContract.methods.getOrganizationDetailsByorganizationID(element.returnValues.hostOrganizationID).call().then(res => {
              data["partnerRole"] = element.returnValues.partnerRole;
              data["projectID"] = element.returnValues.projectID;
              data["hostOrganizationID"] = element.returnValues.hostOrganizationID;
              data["timestamp"] = element.returnValues.timestamp;
              data["name"] = res.name;
              data["status"] = status;
              tempData.push(data);
              setLoader(false);
              setProjectInviteList(tempData);
              forceUpdate();
              // console.log(tempData);
            })
            // }
          })
        } else {
          setLoader(false);
          setProjectInviteList(tempData);
        }
      });
    })
    forceUpdate();
    setLoader(false);
    setProjectInviteList(tempData);
  }, []);
  // const projectURL = (projectID) => {
  //   return "/dashboard/projects/" + projectID;
  // }

  const acceptInvite = async () => {
    setIsloading(true);
    let privateKey = await sessionStorage.getItem('privateKey');
    var transaction = {
      "to": partnerAddress,
      "data": partnerContract.methods.acceptPartnership(
        projectData.projectID,
        projectData.partnerRole,
        selectedAddress
        // props.user.user[0]
      ).encodeABI()
    };
    transaction["gasLimit"] = 4700000;
    web3.eth.accounts.signTransaction(transaction, privateKey)
      .then(res => {
        web3.eth.sendSignedTransaction(res.rawTransaction)
          .on('receipt', async function (receipt) {
            window.location.reload();
          })
      })
  }

  const acceptModalHandle = (rowData) => async () => {
    setProjectData(rowData);
    setModalStatus(true)
  }

  const closePartnership = (rowData) => async () => {
    let privateKey = await sessionStorage.getItem('privateKey');
    var transaction = {
      "to": partnerAddress,
      "data": partnerContract.methods.closePartnership(
        rowData.projectID,
        rowData.partnerRole,
        //address
        props.user.user[0]
      ).encodeABI()
    };
    transaction["gasLimit"] = 4700000;
    web3.eth.accounts.signTransaction(transaction, privateKey)
      .then(res => {
        web3.eth.sendSignedTransaction(res.rawTransaction)
          .on('receipt', async function (receipt) {
            window.location.reload();
          })
      })
  }

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
                    { title: "Action", render: rowData => <> {rowData.status ? <Button variant="contained" color="secondary" onClick={closePartnership(rowData)} >Cancel Partnership</Button> : <Button variant="contained" color="primary" onClick={acceptModalHandle(rowData)}>Accept Invite</Button>} </> },
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
      <Modal
        open={isModalOpen}
        onClose={() => {
          setModalStatus(false)
        }
        }
        title="Documents"
        content={
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="industryList" style={{ width: 100 }}>Select Email </InputLabel>
            <Select
              style={{ width: 200 }}
              value={selectedAddress}
              required
              input={<OutlinedInput />}
              onChange={(e) => {
                setSelectedAddress(e.target.value)
              }}
            >
              {userListRender}
            </Select>
          </FormControl>
        }
        action={
          <>
            {isLoading ? <CircularProgress className={classes.progress} /> : <Button variant="contained" color="primary" onClick={() => acceptInvite()}>Accept Invite</Button>}
          </>
        }

      />
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
