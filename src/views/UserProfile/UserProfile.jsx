import React, {useState, useEffect} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";

import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import avatar from "assets/img/faces/marc.jpg";
import {registryContract} from "registryContract";
import {parseJSONFromIPFSHash} from "utils";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
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

const UserProfile = props => {

  const [userDetails, setUserDetails] = useState('');
  const [organizationDetails, setOrganizationDetails] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');
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
    parseJSONFromIPFSHash(props.user.user[4]).then(data => {
      console.log(data);
      setUserDetails(data.info);
    });
  }, []);

  const { classes } = props;

  const updateProfile = () => {
    console.log("Updated");
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary"  >
              <h4 className={classes.cardTitleWhite}>Your Profile</h4>
              <EditIcon onClick={() => setEditMode(true)}/>
            </CardHeader>
            { userDetails ? <CardBody>
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
              </GridContainer>
              <GridContainer>
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
              <Skeleton width="100%"/>
              <Skeleton width="60%" />
              <Skeleton width="100%" />
              <Skeleton width="60%" />
              <Skeleton width="100%" />
              <Skeleton width="60%" />
              <Skeleton width="100%" />
            </React.Fragment>
          )
          }
          </Card>
        </GridItem>
      </GridContainer>
    </div>
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
