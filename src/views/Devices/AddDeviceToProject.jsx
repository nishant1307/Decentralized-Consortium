import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import Skeleton from '@material-ui/lab/Skeleton';
const RegisterDeviceModal = React.lazy(() => import('views/RegisterDeviceModal.js'));
import { openDeviceModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { deviceContract, deviceAddress } from 'deviceContract';
import moment from "moment";
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import web3 from '../../web3';
const Devices = (props) => {
  // console.log(props.match.params.projectID,"in");
  const [tokenIDList, setTokenIDList] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    deviceContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      setTokenIDList(res);
      res.forEach(async (tokenId , key) => {
        // console.log(tokenId, "in", key);
        let deviceDetails = await deviceContract.methods.getDeviceDetails(tokenId).call({
          from: props.auth.user.publicKey
        })
         deviceDetails.tokenId =  tokenId
        //  console.log(deviceDetails, "in1", key);
        // console.log(deviceDetails, "deviceDetails");
        if (deviceDetails.projectId === "0x0000000000000000000000000000000000000000000000000000000000000000")
          setDeviceList(deviceList => [
            ...deviceList,
            deviceDetails
          ])
        setLoader(false);

      });
    });
  }, []);

  useEffect(() => {
    // console.log(deviceList);
  }, [deviceList]);
  const projectURL = (projectID) => {
    return "/dashboard/projects/" + projectID;
  }

  async function addDevicesToProject(data1) {
    console.log(data1);

    let address = localStorage.getItem("address");
    let privateKey = await sessionStorage.getItem('privateKey');
    let nonce = await web3.eth.getTransactionCount(address);
    var batch = new web3.BatchRequest();
    console.log(nonce);
    data1.forEach(element => {
      var transaction = {
        "nonce": nonce,
        "to": deviceAddress,
        "data": deviceContract.methods.setProjectId(
          element.tokenId,
          props.match.params.projectID
        ).encodeABI()
      };
      // console.log(transaction);
      // let gasLimit = await web3.eth.estimateGas(transaction);
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then((result) => {
          batch.add(web3.eth.sendSignedTransaction(result.rawTransaction)
            .once('receipt', (receipt) => {
              console.log(receipt);
            }));
        })
      nonce++
    })
    batch.execute();
  }

  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                All Unassigned Devices
              </h4>
              {/* <AddBoxIcon onClick={props.openDeviceModal}/> */}
            </CardHeader>
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
              deviceList.length !== 0 ?
                <MaterialTable
                  columns={[
                    { title: "Device URN", field: "tokenId" },
                    { title: "Device Type", field: "deviceType" },
                    { title: "Communication Protocol", field: "communicationProtocol" },
                    { title: "Data Protocol", field: "dataProtocol" },
                    { title: "Sensor", field: "sensor" },
                    { title: "Created at", field: "timeStamp", render: rowData => moment(rowData.timeStamp * 1000).format("DD-MM-YYYY h:mm:ss") },
                  ]}
                  data={deviceList}
                  title=""
                  options={{
                    search: true,
                    exportButton: true,
                    grouping: true,
                    paginationType: "stepped",
                    selection: true
                  }}
                  actions={[
                    {
                      tooltip: 'Add Selected Devices To Project',
                      icon: 'add',
                      onClick: (evt, data) => { addDevicesToProject(data) }
                    }
                  ]}
                /> :
                <h3>No Devices Found!</h3>
            }
          </Card>
        </GridItem>
      </GridContainer>
      <RegisterDeviceModal />
    </div>
  );
}

Devices.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
})
export default connect(mapStateToProps, { openDeviceModal })(withStyles(dashboardStyle)(Devices));
