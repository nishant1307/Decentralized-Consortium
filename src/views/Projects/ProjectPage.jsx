import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import DocConekt from 'views/DocConekt/UploadFile';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { connect } from 'react-redux';
import { openDeviceModal, openDocModal, closeDocModal } from 'actions/userActions';
import RegisterDeviceModal from "views/RegisterDeviceModal";
import RegisterDocModal from "views/RegisterDocModal";
import {registryContract} from 'registryContract';
const ProjectPage = (props) => {
  const {classes} = props;

  const locationPageURL = "/dashboard/projects/"+ props.match.params.projectID + "/location";
  const partnerPageURL = "/dashboard/projects/"+ props.match.params.projectID + "/partners";
  const journeyPageURL = "/dashboard/projects/"+ props.match.params.projectID + "/journey";
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    registryContract.methods.getConsortiumMember(props.match.params.projectID).call({
      from : props.auth.user.publicKey
    }).then(res => {
      setPartners(res);
    })
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
          <Link to={{ pathname: partnerPageURL, state: { partners: partners} }}>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>work</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Participants so far</p>
              <h4 className={classes.cardTitle}>{partners.length}</h4>
            </CardHeader>
          </Link>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
          <Link to={journeyPageURL}>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>apps</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Project Journey so far</p>
              <h4 className={classes.cardTitle}></h4>
            </CardHeader>
          </Link>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                See
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>device_hub</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Devices</p>
              <h4 className={classes.cardTitle}>{props.user.deviceCount}</h4>
            </CardHeader>
            <CardFooter stats onClick={props.openDeviceModal }>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                  Register a device
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader onClick={()=>{props.history.push('/dashboard/docconekt/explore')} }  color="info" stats icon>
              <CardIcon color="info">
                <Icon>file_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Docs</p>
              <h3 className={classes.cardTitle}>{props.user.docCount}</h3>
            </CardHeader>
            <CardFooter onClick={props.openDocModal} stats>
              <div className={classes.stats}>
                <Icon>forward</Icon>
                Upload Doc on DocConekt
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <RegisterDeviceModal projectList= {[props.match.params.projectID]}/>
      <RegisterDocModal />
    </div>
  );
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { openDeviceModal, closeDocModal, openDocModal })(withStyles(dashboardStyle)(ProjectPage));