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
import Snackbar from '../../components/Snackbar/Snackbar.jsx'
import axios from "axios";
import { renderFromArray } from '../../utils';
import { parseJSONFromIPFSHash } from "utils";
import { industryList } from '../../dataset/industries';
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
import { artRoles, agriculture, certification, shipping } from "dataset/projectRoles";

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
  const [error, setError] = useState(false);
  const [revealedPasscode, setRevealedPasscode] = useState('');
  const [partnerRoles, setPartnerRoles] = useState([]);
  const [role, setRole] = useState("Buyer");
  const [invitationStatus, setInvitationStatus] = useState(false);
  const [industry, setIndustry] = useState('');
  const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
  const checkForUser = () => {
    // fetchPasscode();
    registryContract.methods.getPublicKeyFromEmail(inviteEmail).call({
      from: props.auth.user.publicKey
    })
      .then(userAddress => {
        if (userAddress == "0x0000000000000000000000000000000000000000") {
          setModal(false);
          setSnackbar({ color: "danger", open: true, message: "No user found with the entered email." });
          setTimeout(() => {
            setSnackbar({ color: "success", open: false, message: "" });
          }, 10000)
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
          partner.role = role === "" ? "Role Unassigned" : role
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
      role: industry + " | " + role
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
      partnerRole: industry + " | " + role
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
                      <InputLabel htmlFor="industryList">Select Industry</InputLabel>
                      <Select
                        name="industry"
                        required
                        fullWidth
                        labelWidth={110}
                        input={<OutlinedInput name="industry" id="indList" />}
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        {renderFromArray(industryList)}
                      </Select>
                      <FormHelperText color="muted">What industry does your partner cover in project?</FormHelperText>
                    </FormControl>
                    &nbsp;&nbsp;&nbsp;
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="industryList">Select Role</InputLabel>
                      <Select
                        name="role"
                        required
                        fullWidth
                        labelWidth={80}
                        input={<OutlinedInput name="role" id="indList" />}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        {industry === "Art & Collectibles" && renderFromArray(artRoles)}
                        {industry === "Certification" && renderFromArray(certification)}
                        {industry === "Shipping" && renderFromArray(shipping)}
                        {industry === "Agriculture" && renderFromArray(agriculture)}
                      </Select>
                      <FormHelperText color="muted">Select partner's role for project?</FormHelperText>
                    </FormControl>
                  </>

                }
                action={
                  <div>

                    {!inviteOrg && <Button onClick={checkForUser}>Check for user </Button>}
                    {inviteOrg && !invitationStatus && <p>Invite {inviteOrg.name} to your consortium? <Button type="button" onClick={inviteUser}>Yes</Button></p>}
                    {invitationStatus && "Invitation sent successsfully"}
                  </div>
                }
              />
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <Snackbar color={snackbar.color} open={snackbar.open} place="br" className={classes.margin} message={snackbar.message} />
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
