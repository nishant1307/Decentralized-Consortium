import React, { Suspense, useState, useEffect } from "react";
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
import { CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
const RegisterDeviceModal = React.lazy(() => import('views/RegisterDeviceModal.js'));
import { openDeviceModal } from 'actions/userActions';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { connect } from 'react-redux';
import { deviceContract, deviceAddress } from 'deviceContract';
import moment from "moment";
import web3 from '../../web3';
import Modal from "components/CustomModal/Modal";
import MaterialTable from "material-table";
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignProject from "views/Products/AssignProject";
import { Icon, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const Devices = (props) => {
  const [deviceList, setDeviceList] = useState([])
  const [loader, setLoader] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [assignDeviceModal, setAssignDeviceModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    try {
      if (props.user.user[5] != 0) {
        setIsAdmin(true);
      }
    } catch (err) {
      console.log(err);
    }
    deviceContract.methods._tokensOfOwner(props.auth.user.publicKey).call({
      from: props.auth.user.publicKey
    }).then(res => {
      if (res.length == 0)
        setLoader(false);
      res.forEach(tokenId => {
        deviceContract.methods.getDeviceDetails(tokenId).call({
          from: props.auth.user.publicKey
        }).then(deviceDetails => {
          deviceDetails[0].deviceURN = tokenId;
          deviceDetails[0].projectId = (deviceDetails[0].projectId == 0x0000000000000000000000000000000000000000000000000000000000000000) ?
            "Unassigned" :
            deviceDetails[0].projectId;
          setDeviceList(deviceList => [
            ...deviceList,
            deviceDetails[0]
          ])
          setLoader(false);
        });
      });
    });
  }, [props.user]);
  async function assignDevicesToProject() {
    setLoading(true);
    let address = localStorage.getItem("address");
    let privateKey = await sessionStorage.getItem('privateKey');
    let nonce = await web3.eth.getTransactionCount(address);
    var batch = new web3.BatchRequest();
    // console.log(nonce);
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
              // console.log(receipt);
              setLoading(false);
              setAssignDeviceModal(false);
              window.location.reload();
            }));
        })
      nonce++
    })
    batch.execute();
  }

  const addDevicesToProject = (data1) => {
    // console.log(data1);
    setAssignDeviceModal(true);
    setSelectedItems(data1);
  }

  const projectURL = (projectID) => {
    return "/dashboard/projects/" + projectID;
  }
  const { classes } = props;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                My Devices
              </h4>
              {isAdmin && <AddBoxIcon onClick={props.openDeviceModal} style={{ float: "right" }} />}
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
              <MaterialTable
                columns={[
                  {
                    title: 'Avatar',
                    field: 'avatar',
                    render: rowData => (
                      <img
                        style={{ height: 36, borderRadius: '50%' }}
                        src={rowData.avatar}
                      />
                    ),
                  },
                  { title: 'Id', field: 'id' },
                  { title: 'First Name', field: 'first_name' },
                  { title: 'Last Name', field: 'last_name' },
                ]}
                data={query =>
                  new Promise((resolve, reject) => {
                    let url = 'https://reqres.in/api/users?'
                    url += 'per_page=' + query.pageSize
                    url += '&page=' + (query.page + 1)
                    fetch(url)
                      .then(response => response.json())
                      .then(result => {
                        resolve({
                          data: result.data,
                          page: result.page - 1,
                          totalCount: result.total,
                        })
                      })
                  })
                }
                title=""
                options={{
                  search: true,
                  exportButton: true,
                  grouping: true,
                  paginationType: "stepped",
                  selection: true
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "No Devices Found!"
                  }
                }}
                actions={[
                  {
                    tooltip: 'Add Selected Devices To Project',
                    icon: 'link',
                    onClick: (evt, data) => { addDevicesToProject(data) }
                  }
                ]}
              />
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
            <AssignProject userPublicKey={props.auth.user.publicKey} onSelectProject={(e) => {
              // console.log("Selected", e.target.value);
              setSelectedProject(e.target.value);
            }}
              selectedProject={selectedProject}
            />
          }
          action={
            !isLoading ? <Button onClick={assignDevicesToProject}>Assign {selectedItems.length} devices to Project</Button> : <CircularProgress />
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
export default connect(mapStateToProps, { openDeviceModal })(withStyles(dashboardStyle)(Devices));
