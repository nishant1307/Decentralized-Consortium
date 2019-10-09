import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import Skeleton from '@material-ui/lab/Skeleton';
const ProjectFormModal = React.lazy(() => import('views/ProjectFormModal.js'));
import { openProjectModal, inviteUserToConsortium } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
// import { docContract } from 'DocContract';
import MaterialTable from "material-table";
// import { Button } from '@material-ui/core';
// import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
// import web3 from '../../web3';

function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}


const Projects = (props) => {

  // const [projectInviteList, setProjectInviteList] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [inviteSent, setInviteSent] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (props.documentReviewList) { 
      setLoader(false);
      forceUpdate()
    }
  }, [])

  // useEffect(() => {
  //   let sortedByToken = []
  //   docContract.methods._tokensOfProject(props.projectID).call().then(tokens => {
  //     // console.log(tokens);
  //     for (let index = 0; index < tokens.length; index++) {
  //       const element = tokens[index];
  //       docContract.getPastEvents('ReviewersAdded', {
  //         filter: { "_projectId": props.projectID, "_address": props.user.user[0], "_tokenId": element },
  //         fromBlock: 0,
  //         toBlock: 'latest'
  //       }, async function (error, events) {
  //         if (events.length > 0) {
  //           // console.log(await returnLast(events), "returned");
  //           let temp = await returnLast(events);
  //           // console.log(temp,element);
  //           sortedByToken.push(temp.returnValues)
  //           setProjectInviteList(sortedByToken)
  //           forceUpdate();
  //           forceUpdate();
  //           setLoader(false);
  //         }
  //       })

  //     }
  //   })
  // }, []);

  // function returnLast(tempData) {
  //   let k;
  //   for (let i = 0, k = 0; i < tempData.length; i++) {
  //     for (let j = 0; j < i; j++) {
  //       if (tempData[i].blockNumber > tempData[j].blockNumber) {
  //         k = tempData[i];
  //         tempData[i] = tempData[j];
  //         tempData[j] = k;
  //       }
  //     }
  //   }
  //   return tempData[0]
  // }


  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            {loader ?
              <React.Fragment>
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
              </React.Fragment> :
              props.documentReviewList.length !== 0 ?
                <MaterialTable
                  columns={[
                    { title: "Document Id", field: "_tokenId" },
                    // { title: "Partner Role", field: "partnerRole" },
                    // { title: "Organization ID", field: "hostOrganizationID" },
                    // { title: 'time', render: rowData => <p>{moment(rowData['timestamp'] * 1000).format("DD-MM-YYYY h:mm:ss")}</p> },
                    // { title: "Action", render: rowData => <> {rowData.status ? <Button variant="contained" color="secondary" onClick={closePartnership(rowData)} >Cancel Partnership</Button> : <Button variant="contained" color="primary" onClick={acceptInvite(rowData)}>Accept Invite</Button>} </> },
                    { title: "Project Id", field: "_projectId" }
                  ]}
                  data={props.documentReviewList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true
                  }}
                />
                :
                <h3>No New Invites Found!</h3>
            }
          </Card>
        </GridItem>
      </GridContainer>
      <ProjectFormModal />
    </div>
  );
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})
export default connect(mapStateToProps, { openProjectModal, inviteUserToConsortium })(withStyles(dashboardStyle)(Projects));
