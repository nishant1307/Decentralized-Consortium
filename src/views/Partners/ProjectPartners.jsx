import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import MaterialTable from "material-table";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button";
import Modal from "components/CustomModal/Modal";
import AddBoxIcon from '@material-ui/icons/AddBox';
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
import { List, ListItem, ListItemText, MenuItem, Menu, TextField } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
const ProjectPartners = (props) => {
  const {classes} = props;
  const [partners, setPartners] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteOrg, setInviteOrg] = useState('');
  const [invitePublicKey, setInvitePublicKey] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [revealedPasscode, setRevealedPasscode] = useState('');
  const [partnerRoles, setPartnerRoles] = useState([]);
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

  useEffect(() => {
    registryContract.methods.getConsortiumMembers(props.projectID).call({
      from : props.auth.user.publicKey
    }).then(res => {
      res.forEach(partner => {
        registryContract.methods.getPartnerRole(props.projectID, partner.publicKey).call({
          from: props.auth.user.publicKey
        }).then(role=> {
          let decodedRole;
          switch (parseInt(role)) {
            case 0: decodedRole = "Role Unassigned"
                    break;
            case 1: decodedRole = "Buyer";
                    break;
            case 2: decodedRole = "Seller";
                    break;
            case 3: decodedRole = "Logistics";
                    break;
            case 4: decodedRole = "Agent";
                    break;
            case 5: decodedRole = "Bank";
                    break;
          }
          partner.role = decodedRole
          setPartners(partners => [
            ...partners,
            partner
          ])
        })
      })
    })

  }, []);

  const inviteUser = () => {
    props.inviteUserToConsortium({
      projectID: props.projectID,
      inviteAddress: invitePublicKey,
      partnerRole: 5
    })
  }

  const fetchPasscode = () => {
    registryContract.methods.fetchProjectPasscode(props.projectID).call({
      from: props.auth.user.publicKey
    })
    .then(passcode => {
      setRevealedPasscode(web3.utils.hexToUtf8(passcode));
      console.log("Role", passcode);
    });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
              <MaterialTable
                  columns={[
                    { title: "Email", field: "email" },
                    { title: "PublicKey", field: "publicKey" },
                    { title: "OrganizationID", field: "organizationID"},
                    { title: "Role in Consortium", field: "role"},
                  ]}
                  data={partners}
                  title="List of all current participants"
                  options={{
                    search: true,
                    exportButton: true
                  }}
                  actions={[
                    {
                      icon: 'add_box',
                      tooltip: 'Invite Users to Consortium',
                      isFreeAction: true,
                      onClick: (event) => setModal(true)
                    }
                  ]}
                />
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
                <Button color="grayColor" onClick={checkForUser}>Check for user </Button>
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
