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
            {
                <CardBody>
                  <MaterialTable
                      columns={[
                        { title: "Email", field: "email" },
                        { title: "PublicKey", field: "publicKey" },
                        { title: "OrganizationID", field: "organizationID"}
                      ]}
                      data={partners}
                      title="List of all current participants"
                      options={{
                        search: true,
                        exportButton: true
                      }}
                    />
                </CardBody>
            }
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
