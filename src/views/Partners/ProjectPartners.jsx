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
import Table from "components/Table/Table.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

  const checkForUser = () => {
    registryContract.methods.getPublicKeyFromEmail(inviteEmail).call({
      from: props.auth.user.publicKey
    })
    .then(userAddress => {
      setInvitePublicKey(userAddress);
      registryContract.methods.getOrganizationDetails().call({
        from: userAddress
      }).then(org => {
        setInviteOrg(org.name)
      })

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
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Public Key", "OrganizationID", "Email", "KYC Status", "User KYC Hash", "User Role"]}
                    tableData={partners}
                  />
                </CardBody>
            }
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader>
              <TextField type="text"
                name="InviteEmail to invite to Consortium"
                value={inviteEmail}
                onChange={(e) => {setInviteEmail(e.target.value)}}
                label="Enter email"  />
              <Button type="button" onClick={checkForUser}>Check for user </Button>
              {inviteOrg && <p>Invite {inviteOrg} to your consortium? <Button type="button" onClick={inviteUser}>Yes</Button></p>}
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