import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TimelineIcon from '@material-ui/icons/Timeline';
import WorkIcon from '@material-ui/icons/Work';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import ShoppingCart from "@material-ui/icons/ShoppingCart"
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs";
import Badge from '@material-ui/core/Badge';
import DocConekt from 'views/DocConekt/UploadFile';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { openDocModal, closeDocModal } from 'actions/userActions';
import ProjectInvites from "views/Projects/ProjectInvites";
import RegisterDocModal from "views/RegisterDocModal";
import ProjectPartners from "views/Partners/ProjectPartners";
const TimelineComponent = React.lazy(() => import('components/Timeline/Timeline.jsx'));
import { registryContract } from 'registryContract';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';
import DocumentReview from 'views/DocConekt/DocumentReview';
import { docContract } from 'DocContract';

function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}

const ProjectPage = (props) => {
  const { classes } = props;

  const locationPageURL = "/dashboard/projects/" + props.match.params.projectID + "/location";
  const partnerPageURL = "/dashboard/projects/" + props.match.params.projectID + "/partners";
  const journeyPageURL = "/dashboard/projects/" + props.match.params.projectID + "/journey";
  // const addDevicePageURL = "/dashboard/projects/"+ props.match.params.projectID + "/adddevices";
  const getDevicePageURL = "/dashboard/projects/" + props.match.params.projectID + "/devices";
  const [projectDetails, setProjectDetails] = useState('');

  // const addProductPageURL = "/dashboard/projects/"+ props.match.params.projectID + "/addproducts";
  const getProductPageURL = "/dashboard/projects/" + props.match.params.projectID + "/products";
  const getDocumentsPageURL = "/dashboard/projects/" + props.match.params.projectID + "/documents";
  // const [partners, setPartners] = useState([]);
  const [documentReviewList, setDocumentReviewList] = useState([]);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    if (!props.location.state)
      props.history.push("/dashboard/home")
    else
      setProjectDetails(props.location.state.projectDetails);

  }, []);
  useEffect(() => {
    let sortedByToken = []
    docContract.methods._tokensOfProject(props.match.params.projectID).call().then(tokens => {
      // console.log(tokens);
      for (let index = 0; index < tokens.length; index++) {
        const element = tokens[index];
        docContract.getPastEvents('ReviewersAdded', {
          filter: { "_projectId": props.match.params.projectID, "_address": props.user.user[0], "_tokenId": element },
          fromBlock: 0,
          toBlock: 'latest'
        }, async function (error, events) {
          if (events.length > 0) {
            // console.log(await returnLast(events), "returned");
            let temp = await returnLast(events);
            // console.log(temp,element);
            sortedByToken.push(temp.returnValues)
            setDocumentReviewList(sortedByToken)
            forceUpdate();
            forceUpdate();
            forceUpdate();
          }
        })

      }
    })
  }, []);

  function returnLast(tempData) {
    let k;
    for (let i = 0, k = 0; i < tempData.length; i++) {
      for (let j = 0; j < i; j++) {
        if (tempData[i].blockNumber > tempData[j].blockNumber) {
          k = tempData[i];
          tempData[i] = tempData[j];
          tempData[j] = k;
        }
      }
    }
    return tempData[0]
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Link to={getDevicePageURL}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <DeviceHubIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Devices </p>
                {/* <h4 className={classes.cardTitle}></h4> */}
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <VisibilityIcon />
                  View
              </div>
              </CardFooter>
            </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Link to={getProductPageURL}><Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <ShoppingCart />
              </CardIcon>
              <p className={classes.cardCategory}>Products</p>
              {/* <h4 className={classes.cardTitle}></h4> */}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <VisibilityIcon />
                View
              </div>
            </CardFooter>
          </Card>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader onClick={() => {
              props.history.push({
                pathname: getDocumentsPageURL,
                state: { documentReviewList: documentReviewList }
              })
            }} color="danger" stats icon>
              <CardIcon color="danger">
                <FileCopyIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Docs</p>
              {/* <h4 className={classes.cardTitle}>{props.user.docCount}</h4> */}
            </CardHeader>
            <CardFooter onClick={props.openDocModal} stats>
              <div className={classes.stats}>
                <VisibilityIcon />
                Upload Doc on DocConekt
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Project:"
            variant="fullWidth"
            headerColor="primary"
            tabs={[
              {
                tabName: "Project Details",
                tabIcon: InfoIcon,
                tabContent: (
                  <>
                    {projectDetails &&
                      <>
                        <b>Project Name:</b> {projectDetails.name}<br />
                        <b>Project ID: </b>{projectDetails.projectID}<br />
                        <b>Project Description:</b> {projectDetails.description}<br />
                        <b>Project Industry:</b> {projectDetails.industry}<br />
                      </>
                    }
                  </>
                )
              },
              {
                tabName: "Participants",
                tabIcon: WorkIcon,
                tabContent: (
                  <ProjectPartners projectID={props.match.params.projectID} />
                )
              },
              {
                tabName: "Document Review List",
                tabIcon: AssignmentIcon,
                tabContent: (
                  <DocumentReview projectID={props.match.params.projectID} documentReviewList={documentReviewList} />
                )
              },
              {
                tabName: "Journey",
                tabIcon: TimelineIcon,
                tabContent: (
                  <TimelineComponent {...props} />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
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

export default connect(mapStateToProps, { closeDocModal, openDocModal })(withStyles(dashboardStyle)(ProjectPage));
