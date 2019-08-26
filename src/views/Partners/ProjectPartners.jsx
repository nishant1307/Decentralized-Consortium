import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from "material-table";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Card from "components/Card/Card.jsx";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button";
import Modal from "components/CustomModal/Modal";
import {parseJSONFromIPFSHash} from "utils";
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

import {registryContract} from "registryContract";
import {inviteUserToConsortium} from "actions/userActions";
import web3 from "../../web3";
// import CustomLoader from 'components/Loaders/CustomLoader';
import {connect} from "react-redux";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
const ProjectPartners = (props) => {
  const {classes} = props;
  const {partners} = props.location.state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteOrg, setInviteOrg] = useState('');
  const [invitePublicKey, setInvitePublicKey] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [revealedPasscode, setRevealedPasscode] = useState('');

  const checkForUser = () => {
    registryContract.methods.getPublicKeyFromEmail(inviteEmail).call({
      from: props.auth.user.publicKey
    })
    .then(userAddress => {

      if(userAddress=="0x0000000000000000000000000000000000000000"){
        setError("No user found with the Entered email")
      }else {
        setInvitePublicKey(userAddress);
        registryContract.methods.getOrganizationDetails().call({
          from: userAddress
        }).then(org => {
          setInviteOrg(org.name)
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const inviteUser = () => {
    props.inviteUserToConsortium({
      projectID: props.match.params.projectID,
      inviteAddress: invitePublicKey,
      partnerRole: 1
    })
  }

  const fetchPartnerRole = (publicKey) => {
    registryContract.methods.getPartnerRole(props.match.params.projectID, publicKey).call({
      from: props.auth.user.publicKey
    })
    .then(role => {
      console.log("Role", role);
      return role;
    });
  }

  const fetchPasscode = () => {
    registryContract.methods.fetchProjectPasscode(props.match.params.projectID).call({
      from: props.auth.user.publicKey
    })
    .then(passcode => {
      setRevealedPasscode(web3.utils.hexToUtf8(passcode));
      console.log("Role", passcode);
    });
  }

  return (
    <div>
      <AddCircleOutlineIcon onClick={() => setModal(true)}/>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                List of all current participants
              </h4>
            </CardHeader>
              <MaterialTable
                  columns={[
                    { title: "Email", field: "email" },
                    { title: "PublicKey", field: "publicKey" },
                    { title: "OrganizationID", field: "organizationID"},
                    { title: "Role in Consortium", field: "publicKey" , render: rowData => <Button color="primary" onClick = {fetchPartnerRole(rowData.publicKey)}> Fetch Role</Button>},
                  ]}
                  data={partners}
                  title=""
                  options={{
                    search: true,
                    exportButton: true
                  }}
                />
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader>
            <Modal
              open={modal}
              onClose={() => setModal(false)}
              title= "Invite User To Consortium"
              content={
                <TextField type="text"
                  name="InviteEmail to invite to Consortium"
                  value={inviteEmail}
                  onChange={(e) => {setInviteEmail(e.target.value)}}
                  label="Enter email"  />
              }
              action={
                <div>
                <Button color="primary" onClick={checkForUser}>Check for user </Button>
                  {inviteOrg && <p>Invite {inviteOrg} to your consortium? <Button type="button" onClick={inviteUser}>Yes</Button></p>}
                {revealedPasscode? revealedPasscode: <Button color="primary" onClick={fetchPasscode}>Reveal Passcode</Button>}
                </div>
              }
              />
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ProjectPartners.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps, {inviteUserToConsortium})(withStyles(dashboardStyle)(ProjectPartners));
