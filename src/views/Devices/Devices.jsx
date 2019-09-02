import React, {Suspense, useState, useEffect} from "react";
import { Link } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Skeleton from '@material-ui/lab/Skeleton';
const RegisterDeviceModal = React.lazy(() => import('views/RegisterDeviceModal.js'));
import {openDeviceModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import {deviceContract, deviceAddress} from 'deviceContract';
import moment from "moment";
import web3 from '../../web3';
import Modal from "components/CustomModal/Modal";
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignProject from "views/Products/AssignProject";
import { Icon, Button } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const Devices = (props) => {
  const [deviceList, setDeviceList] = useState([])
  const [loader, setLoader] = useState(true);

  const [assignDeviceModal, setAssignDeviceModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(()=> {
    deviceContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      if(res.length==0)
        setLoader(false);
      res.forEach(tokenId => {
        deviceContract.methods.getDeviceDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(deviceDetails => {
          deviceDetails[0].deviceURN= tokenId;
          deviceDetails[0].projectId= (deviceDetails[0].projectId==0x0000000000000000000000000000000000000000000000000000000000000000)?
          "Unassigned":
          deviceDetails[0].projectId;
          setDeviceList(deviceList => [
            ...deviceList,
            deviceDetails[0]
          ])
          setLoader(false);
        });
      });
    });
  }, []);
  async function assignDevicesToProject() {
    let address = localStorage.getItem("address");
    let privateKey = await sessionStorage.getItem('privateKey');
    let nonce = await web3.eth.getTransactionCount(address);
    var batch = new web3.BatchRequest();
    console.log(nonce);
    selectedItems.forEach(element => {
      var transaction = {
        "nonce": nonce,
        "to": deviceAddress,
        "data": deviceContract.methods.setProjectId(
          element.deviceURN,
          selectedProject
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

  const addDevicesToProject = (data1) =>  {
    console.log(data1);
    setAssignDeviceModal(true);
    setSelectedItems(data1);
  }

  const projectURL = (projectID) => {
    return "/dashboard/projects/"+ projectID;
  }
  const {classes} = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Devices
              </h4>
              {props.user.user[5]!=0 && <AddBoxIcon onClick={props.openDeviceModal}/>}
            </CardHeader>
        {loader ?
          <React.Fragment>

                <Skeleton width="100%"/>
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
                <Skeleton width="60%" />
                <Skeleton width="100%" />
          </React.Fragment> :
            deviceList.length !== 0  ?
              <MaterialTable
                  columns={[
                    { title: "Device URN", field: "deviceURN"},
                    { title: "Device Type", field: "deviceType" },
                    { title: "Communication Protocol", field: "communicationProtocol" },
                    { title: "Data Protocol", field: "dataProtocol"},
                    { title: "Sensor", field: "sensor"},
                    { title: "Project ID", field: "projectId", defaultGroupOrder: 0},
                    { title: "Created at", field: "timeStamp", render: rowData => moment(rowData.timeStamp*1000).format("DD-MM-YYYY h:mm:ss")},
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
                      icon: 'link',
                      onClick: (evt, data) => { addDevicesToProject(data) }
                    }
                  ]}
                />:
                <h3>No Devices Found!</h3>
        }
        </Card>
        </GridItem>
      </GridContainer>
      <Suspense>
        <RegisterDeviceModal />
        <Modal
          open={assignDeviceModal}
          onClose={() => setAssignDeviceModal(false)}
          title="Assign to Project"
          content={
            <AssignProject userPublicKey = {props.auth.user.publicKey} onSelectProject = {(e) =>
              {
                console.log("Selected", e.target.value);
                setSelectedProject(e.target.value);
              }}
            selectedProject = {selectedProject}
            />
          }
          action={
            <Button onClick={assignDevicesToProject}>Assign {selectedItems.length} devices to Project</Button>
          }

          />
      </Suspense>
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
export default connect(mapStateToProps, {openDeviceModal}) (withStyles(dashboardStyle)(Devices));
