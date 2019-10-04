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
import { docContract } from 'DocContract';
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import web3 from '../../web3';

function useForceUpdate() {
  const [value, set] = useState(true); //boolean state
  return () => set(value => !value); // toggle the state to force render
}


const Projects = (props) => {

  const [projectInviteList, setProjectInviteList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [inviteSent, setInviteSent] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    let tempData = []
    docContract.getPastEvents('ReviewersAdded', {
      filter: { "_projectId": props.projectID },
      fromBlock: 0,
      toBlock: 'latest'
    }, function (error, events) {
      console.log(events);

      for (let index = 0; index < events.length; index++) {
        const element = events[index];
        for (let index = 0; index < element.returnValues._listOfAddress.length; index++) {
          const element2 = element.returnValues._listOfAddress[index];
          // console.log(element2,"in here",element2 === props.user.user[0]);
          if (element2 === props.user.user[0]) {
            console.log("in here", element.returnValues._tokenId, element.blockNumber);
            tempData.push(element.returnValues._tokenId)
          }
        }
      }

      console.log(tempData  );
      
      // var grades = {};
      // tempData.forEach(function (item) {
      //   var grade = grades[item.returnValues._tokenId] = grades[item.returnValues._tokenId] || {};
      //   grade[item.Domain] = true;
      // });

      // console.log(JSON.stringify(grades, null, 4));


      // for (let index = 0; index < events.length; index++) {
      //   const element = events[index];
      //   docContract.methods._tokensOfProject(props.projectID).call({
      //     from: props.auth.user.publicKey
      //   }).then(async res => {
      //     for (let index = 0; index < res.length; index++) {
      //       const element2 = res[index];
      //       let _tokenId = await web3.utils.sha3(element2);
      //       if (_tokenId === element.returnValues._tokenId) {
      //         tempData.push(element)
      //         console.log("inside this", element.blockNumber);
      //       }
      //     }
      //   })
      // }
      // for (let index = 0; index < tempData.length; index++) {
      //   const element3 = tempData[index];
      //   if (element3.returnValues._tokenId === element.returnValues._tokenId) {
      //     console.log("same");

      //   }
      // }
    })

    // ReviewersAdded
  }, []);




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
              projectInviteList.length !== 0 ?
                <MaterialTable
                  columns={[
                    { title: "Host Organization", field: "name" },
                    { title: "Partner Role", field: "partnerRole" },
                    { title: "Organization ID", field: "hostOrganizationID" },
                    { title: 'time', render: rowData => <p>{moment(rowData['timestamp'] * 1000).format("DD-MM-YYYY h:mm:ss")}</p> },
                    { title: "Action", render: rowData => <> {rowData.status ? <Button variant="contained" color="secondary" onClick={closePartnership(rowData)} >Cancel Partnership</Button> : <Button variant="contained" color="primary" onClick={acceptInvite(rowData)}>Accept Invite</Button>} </> },
                    // { title: "Project Id", field: "projectID" }
                  ]}
                  data={projectInviteList}
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
