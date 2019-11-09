import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import avatar from "assets/img/faces/marc.jpg";
import { registryContract } from "registryContract";
import { parseJSONFromIPFSHash } from "utils";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core';
var QRCode = require('qrcode.react');
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const jsPDF = require('jspdf');
var passworder = require('browser-passworder');
const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
    width: theme.spacing(25),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const UserProfile = props => {
  const classes2 = useStyles();
  const [userDetails, setUserDetails] = useState('');
  const [organizationDetails, setOrganizationDetails] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [privateKey, setPrivateKey] = React.useState(null);
  const [isQRcodeOpen, setIsQRcodeOpen] = useState(false);
  const [isQRcode, setIsQRcode] = useState(false);

  useEffect(() => {
    // registryContract.methods.getUserOrganizationDetails().call({
    //   from : localStorage.getItem("address")
    // }).then(res => {
    //   console.log(res);
    //   setUserDetails(res[0]);
    //   setOrganizationDetails(res[1]);
    // })
    // axios.get("https://files.arthanium.org/ipfs/"+props.user.user[4], {}).then(res => {
    //   console.log();
    //
    // })

    parseJSONFromIPFSHash(props.user.user[4]).then(async data => {
      // console.log(data);
      setUserDetails(data.info);
    });
  }, []);

  function handleOpen(purpose) {
    setOpen(true);
    setIsQRcode(purpose === "QR" ? true : false);
  }

  const { classes } = props;

  const handleDownload = () => {
    let temp = localStorage.getItem("data");
    passworder.decrypt(password, JSON.parse(temp))
      .then(async function (result) {
        if (isQRcode) {
          setPrivateKey(await sessionStorage.getItem('privateKey'));
          setIsQRcodeOpen(true);
        } else {
          let dataToPrint = JSON.parse(result).mnemonic ? JSON.parse(result).mnemonic : JSON.parse(result).privateKey
          var doc = new jsPDF()
          doc.text(JSON.stringify(dataToPrint), 20, 20)
          doc.save('recovery key.pdf')
        }
        setOpen(false);
        setPassword("");
      }).catch((reason) => {
        console.error(reason)
      })
    console.log(password);
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary"  >
              <h4 className={classes.cardTitleWhite}>Your Profile</h4>
              <EditIcon onClick={() => setEditMode(true)} />
            </CardHeader>
            {userDetails ? <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Company"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={props.user.organization[1]}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="UserID"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={props.user.user[0]}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {!editMode ?
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={userDetails.email}
                    /> :
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      placeholder={userDetails.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  }
                </GridItem>
                {/* </GridContainer>
              <GridContainer> */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Full Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={userDetails.fullName}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={userDetails.city}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={userDetails.country}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={userDetails.zipcode}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
              :
              (
                <React.Fragment>
                  <Skeleton width="100%" />
                  <Skeleton width="60%" />
                  <Skeleton width="100%" />
                  <Skeleton width="60%" />
                  <Skeleton width="100%" />
                  <Skeleton width="60%" />
                  <Skeleton width="100%" />
                </React.Fragment>
              )
            }
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <Fab onClick={() => { handleOpen("seed") }} variant="extended" aria-label="delete" className={classes2.fab} >
                  <SaveAltIcon className={classes2.extendedIcon} />
                  Save Access key
                        </Fab>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Fab onClick={() => { handleOpen("QR") }} variant="extended" aria-label="delete" className={classes2.fab}>
                <VisibilityIcon className={classes2.extendedIcon} />
                  Private Key
                        </Fab>
              </GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Please enter the password"}</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
            </Button>
          <Button onClick={() => handleDownload()} color="primary" autoFocus>
            Submit
            </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isQRcodeOpen}
        onClose={() => setIsQRcodeOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Scan for Privatekey"}</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {privateKey !== null && <QRCode
                id={privateKey}
                value={privateKey}
                size={290}
                level={"H"}
                includeMargin={true}
              />}
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
    </div >
  );
};

UserProfile.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(UserProfile));
