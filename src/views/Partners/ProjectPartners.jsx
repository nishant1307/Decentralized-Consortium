import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { renderFromArray } from '../../utils';
import { parseJSONFromIPFSHash } from "utils";
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

import { registryContract } from "registryContract";
import { inviteUserToConsortium } from "actions/userActions";
import { partnerContract, partnerAddress } from 'partnersContract';
import web3 from "../../web3";
// import CustomLoader from 'components/Loaders/CustomLoader';
import { connect } from "react-redux";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {
  List, ListItem, ListItemText, MenuItem, Menu, TextField, FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ProjectPartners = (props) => {
  const roleCategory = [
    "Select Role",
    "Agent",
    "Bank",
    "Brand",
    "Buyer",
    "Certification Agency",
    "Consumer",
    "Customs / Authorities",
    "Distributor",
    "Environmental Health & Safety",
    "Facility Maintenance",
    "Field Services",
    "Government",
    "Hardware Integrator",
    "Human Resources",
    "Infrastructure",
    "Insurance",
    "Logistics",
    "Logistics - 3PL",
    "Logistics - Intermodal",
    "Logistics - Ocean Carriers",
    "Maintenance",
    "Marketing",
    "Material Supplier",
    "Municipal / Local Body",
    "Ports / Terminals",
    "Power / Energy",
    "Procurement & Sourcing",
    "Product Development",
    "Production - Manufacturing",
    "Production - Natural Resources",
    "Quality Assurance",
    "Real Estate / Property Management",
    "Recycling",
    "Research & Development",
    "Seller",
    "Software Integrator",
    "Telecom",
    "Traffic Management",
    "Transportation",
    "Utility",
    "Warehouse Management",
    "Warehousing",
    "Waste Management"
  ]

  const { classes } = props;
  const [partners, setPartners] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteOrg, setInviteOrg] = useState('');
  const [invitePublicKey, setInvitePublicKey] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [revealedPasscode, setRevealedPasscode] = useState('');
  const [partnerRoles, setPartnerRoles] = useState([]);
  const [role, setRole] = useState("Buyer");
  const [invitationStatus, setInvitationStatus] = useState(false);
  const checkForUser = () => {
    // fetchPasscode();
    registryContract.methods.getPublicKeyFromEmail(inviteEmail).call({
      from: props.auth.user.publicKey
    })
      .then(userAddress => {

        if (userAddress == "0x0000000000000000000000000000000000000000") {
          setError("No user found with the Entered email")
        } else {
          setInvitePublicKey(userAddress);
          registryContract.methods.getOrganizationDetails().call({
            from: userAddress
          }).then(org => {
            console.log(org);
            setInviteOrg(org)
          })
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }

  useEffect(() => {
    registryContract.methods.getConsortiumMembers(props.projectID).call({
      from: props.auth.user.publicKey
    }).then(res => {
      res.forEach(partner => {
        partnerContract.methods.getPartnerRole(props.projectID, partner.publicKey).call({
          from: props.auth.user.publicKey
        }).then(role => {
          let temp = parseInt(role);

          // let decodedRole;
          // switch (parseInt(role)) {
          //   case 0: decodedRole = "Role Unassigned"
          //     break;
          //   case 1: decodedRole = "Buyer";
          //     break;
          //   case 2: decodedRole = "Seller";
          //     break;
          //   case 3: decodedRole = "Logistics";
          //     break;
          //   case 4: decodedRole = "Agent";
          //     break;
          //   case 5: decodedRole = "Bank";
          //     break;
          // }
          partner.role = temp === 0 ? "Role Unassigned" : roleCategory[parseInt(role)]
          setPartners(partners => [
            ...partners,
            partner
          ])
        })
      })
    })

  }, []);

  const inviteUser = () => {
    // console.log(inviteOrg,"inviteOrg");
    axios.post("https://api.arthanium.org/api/v1/inviteUserToConsortium", {
      email: inviteEmail,
      projectID: props.projectID,
      passcode: revealedPasscode,
      role: role
    }).then(res => {
      console.log(res);
      if (res.status = 200)
        setInvitationStatus(true);
    })
    //
    props.inviteUserToConsortium({
      partnerOrganizationID: inviteOrg.organizationID,
      projectID: props.projectID,
      // inviteAddress: invitePublicKey,
      partnerRole:role
    })
  }

  // const fetchPasscode = () => {
  //   registryContract.methods.fetchProjectPasscode(props.projectID).call({
  //     from: props.auth.user.publicKey
  //   })
  //     .then(passcode => {
  //       setRevealedPasscode(web3.utils.hexToUtf8(passcode));
  //       // console.log("Role", passcode);
  //     });
  // }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <MaterialTable
            columns={[
              { title: "Email", field: "email" },
              { title: "PublicKey", field: "publicKey" },
              { title: "OrganizationID", field: "organizationID" },
              { title: "Role in Consortium", field: "role" },
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
                title="Invite User To Consortium"
                content={
                  <>
                    <FormControl variant="outlined">
                      <TextField type="text"
                        name="InviteEmail to invite to Consortium"
                        variant="outlined"
                        value={inviteEmail}
                        onChange={(e) => { setInviteEmail(e.target.value) }}
                        label="Enter email"
                      />
                      <FormHelperText color="muted">Enter user's email</FormHelperText>
                    </FormControl>
                    &nbsp;&nbsp;&nbsp;
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="industryList">Select Role</InputLabel>
                      <Select
                        name="industry"
                        required
                        fullWidth
                        labelWidth={80}
                        input={<OutlinedInput name="role" id="indList" />}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {renderFromArray(roleCategory)}
                      </Select>
                      <FormHelperText color="muted">Select user's role for project?</FormHelperText>
                    </FormControl>
                  </>

                }
                action={
                  <div>

                    {!inviteOrg && <Button onClick={checkForUser}>Check for user </Button>}
                    {inviteOrg && <p>Invite {inviteOrg.name} to your consortium? <Button type="button" onClick={inviteUser}>Yes</Button></p>}
                    {invitationStatus && "Invitation sent successsfully"}
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

export default connect(mapStateToProps, { inviteUserToConsortium })(withStyles(dashboardStyle)(ProjectPartners));
